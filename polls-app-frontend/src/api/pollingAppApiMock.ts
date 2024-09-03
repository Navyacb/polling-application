import { IPolls } from './../state-management/UserPollsContextData';
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useErrorMessage } from "../hooks/errorMessage/useErrorMessage";
import {pick} from 'lodash'
import { useContext } from "react";
import { UserAccountContextData } from "../state-management/UserAccountContextData";
import { ICategory } from "../state-management/CategoryContextData";

const api = axios.create({
    baseURL: 'http://localhost:3090', 
    withCredentials: true, 
})


interface IRegisterData {
    username: string,
    email: string,
    password: string,
}

interface ILoginData {
    email : string,
    password: string,
}

export const useRegistrationApi = () => {
    const {errorsDispatch} = useErrorMessage()

    return useMutation(
        async (registerData: IRegisterData) => {
            const response = await api.post('/auth/register', registerData);
            return response.data;
        },
        {
            onError: (error) => {
                if (axios.isAxiosError(error) && error.response) {
                    errorsDispatch({type:'add',payload: error.response.data.errors})
                } else {
                    console.error('Unexpected error:', error);
                }
            },
        }
    )
}


export const useLoginApi = ()=>{
    const {errorsDispatch} = useErrorMessage()
    const {userAccountDispatch} = useContext(UserAccountContextData)
    
    return useMutation(
        async (loginData : ILoginData)=>{
            const response = await api.post('/auth/login',loginData)
            const accountData = await api.get('/users/account')
            const userData = pick(accountData.data,['_id','username','email','pollCreated'])
            userAccountDispatch({type:'add',payload:userData})
            return response.data
        },
        {
            onError: (error) => {
                if (axios.isAxiosError(error) && error.response) {
                    errorsDispatch({type:'add',payload: error.response.data.errors})
                } else {
                    console.error('Unexpected error while login:', error)
                }
            },
        }
    )
}

export const verifyToken = async () => {
    try {
        const response = await api.get('/auth/verify-token', { withCredentials: true });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
            console.error('Token expired or invalid:', error.response.data);
        } else {
            console.error('Unexpected error:',error);
        }
        return { valid: false };
    }
}

export const useLogoutApi = ()=>{
   return useMutation(
    async()=>{
        const response = await api.post('/auth/logout')
        return response
    },
    {
        onError:(error)=>{
            console.log('unexpected error while logout',error)
        }
    }
   )
}


export const fetchCategoryList = async()=>{
    const response = await api.get('/users/category')
    
    const catg = response.data.map((ele: ICategory)=>{
        return {
            categoryName : ele.categoryName,
            _id : ele._id
        }
    })
    return catg
}

export const useAddCategory = ()=>{
    const { errorsDispatch } = useErrorMessage()
    const queryClient = useQueryClient()

    return useMutation(
        async (categoryName: string) => {
            const response = await api.post('/users/addCategory', { categoryName })
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("category");
            },
            onError: (error) => {
                if (axios.isAxiosError(error) && error.response) {
                    errorsDispatch({ type: 'add', payload: error.response.data.errors })
                } else {
                    console.error('Error adding category:', error);
                }
            }
        }
    )
}

export const fetchPollsData = async()=>{
    const response = await api.get('/users/polls')
    return response.data
}


export const useAddPolls = ()=>{
    const queryClient = useQueryClient()
    const { errorsDispatch } = useErrorMessage()

    return useMutation(
        async (poll: IPolls) => {
            const response = await api.post('/users/addPoll', poll)
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("polls");
            },
            onError: (error) => {
                if (axios.isAxiosError(error) && error.response) {
                    errorsDispatch({ type: 'add', payload: error.response.data.errors })
                } else {
                    console.error('Error adding poll:', error);
                }
            }
        }
    );
}
