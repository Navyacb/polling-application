import axios from "axios";
import { useMutation } from "react-query";
import { useErrorMessage } from "../hooks/errorMessage/useErrorMessage";
import {pick} from 'lodash'
import { useContext } from "react";
import { UserAccountContextData } from "../state-management/UserAccountContextData";

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
        const response = await api.get('/auth/verify-token')
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 401) {
                console.error('Token expired or invalid:', error.response.data)
            } else {
                console.error('Axios error:', error.message)
            }
        } else {
            return error
        }
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

