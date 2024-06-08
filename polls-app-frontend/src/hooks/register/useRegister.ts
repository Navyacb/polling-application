import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRegistrationApi } from "../../api/pollingAppApiMock"

export const useRegister = ()=>{
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const { mutate } = useRegistrationApi();
    const navigate = useNavigate();

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
        mutate(
            { username, email, password },
            {
                onSuccess: (data) => {
                    navigate('/login', { state: { msg: data.message, email: email } });
                },
            }
        )
    }
    return {
        email,
        username,
        password,
        handleChange,
        handleRegister
    }
}