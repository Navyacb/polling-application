import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = (emailReg:string)=>{
    const api = axios.create({
        baseURL: 'http://localhost:3090', 
        withCredentials: true, 
    })

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [errors,setErrors] = useState([])

    const navigate = useNavigate()

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const id = e.target.id
        const value = e.target.value
            if (id === 'email'){
                setEmail(value)
            }else if (id === 'password'){
                setPassword(value)
            }
    }

    const handleLogin = async()=>{
        const loginData = {
            email: email || emailReg,
            password
        }
        try{
            const response = await api.post('/auth/login',loginData)
            navigate('/',{state:{msg:response.data.message, name : response.data.name}})
        }
        catch(error){
            if (axios.isAxiosError(error) && error.response) {
                setErrors(error.response.data.errors)
            } else {
                console.error('Unexpected error:', error)
            }
        }
    }

    return ({
        handleChange,
        handleLogin,
        errors,
        password,
        email
    }
    )
}