import axios from "axios"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export const useRegister = ()=>{
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [errors,setErrors] = useState([])

    const navigate = useNavigate()

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const id = e.target.id
        const value = e.target.value
            if(id === 'username'){
                setUsername(value)
            }else if (id === 'email'){
                setEmail(value)
            }else if (id === 'password'){
                setPassword(value)
            }
    }

    const handleRegister = async()=>{
        const registerData = {
            username,
            email,
            password
        }
        try{
            const response = await axios.post('http://localhost:3090/auth/register',registerData)
            navigate('/login',{state:{msg:response.data.message , email : email}})
        }
        catch(error){
            if (axios.isAxiosError(error) && error.response) {
                setErrors(error.response.data.errors)
            } else {
                console.error('Unexpected error:', error)
            }
        }
    }
    return {
        errors,
        email,
        username,
        password,
        handleChange,
        handleRegister
    }
}