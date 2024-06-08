import { Button, Container, List, ListItem, Paper, PasswordInput, Text, TextInput } from "@mantine/core";
import { useRegister } from "../../hooks/register/useRegister";
import { useErrorMessage } from "../../hooks/errorMessage/useErrorMessage";
import { IError } from "../../state-management/ErrorMessageContextData";
import { useEffect } from "react";

const Register = ()=>{

    const {username,email,password,handleChange,handleRegister} = useRegister()
    const {errors,errorsDispatch} = useErrorMessage()

    useEffect(()=>{
        errorsDispatch({type:'clear',payload:[]})
    },[errorsDispatch])

    return (
        <Container p={30} size="responsive" display="table">
            <Text c="dimmed" size="lg" ta="center" mt={5}>
                Register as a new user!
            </Text>
            <Paper withBorder shadow="md" p={30} mt={30} w="30rem" radius="md">
                {
                    (errors.length>0 &&
                        <List withPadding mb={6}>
                            {errors.map((error:IError,i:number)=>{
                                return <ListItem c="red" key={i}>{error.msg}</ListItem>
                            })}
                        </List>
                    )
                }
                <TextInput label="Username" placeholder="username" id="username" required value={username} onChange={handleChange} />
                <TextInput label="Email" placeholder="you@mail.com" id="email" required value={email} onChange={handleChange} />
                <PasswordInput label="Password" id="password" placeholder="Your password" required mt="md" value={password} onChange={handleChange} />
                <Button fullWidth mt="xl" onClick={handleRegister}>
                    Register
                </Button>
            </Paper>
        </Container>
    )
}

export default Register;