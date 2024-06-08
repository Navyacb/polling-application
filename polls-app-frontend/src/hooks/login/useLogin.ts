import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginApi } from "../../api/pollingAppApiMock";

export const useLogin = (emailReg:string)=>{
    const [email,setEmail] = useState(emailReg?emailReg:'')
    const [password,setPassword] = useState('')
    const { mutate } = useLoginApi();

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

        mutate(
            { email, password },
            {
                onSuccess: (data) => {
                    navigate('/', { state: { msg: data.message} });
                },
            }
        )
    }

    return ({
        handleChange,
        handleLogin,
        password,
        email
    })
}