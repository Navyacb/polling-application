import { Alert, Anchor, Button, Container, Group, List, ListItem, Paper, PasswordInput, Text, TextInput } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { useLogin } from "../../hooks/login/useLogin";
import { useErrorMessage } from "../../hooks/errorMessage/useErrorMessage";
import { useEffect } from "react";

const Login = ()=>{
    const location = useLocation()
    const message = location?.state?.msg
    const emailReg = location?.state?.email
    const {handleChange,handleLogin,password,email} = useLogin(emailReg || '')
    const {errors,errorsDispatch} = useErrorMessage()

    useEffect(()=>{
        errorsDispatch({type:'clear',payload:[]})
    },[errorsDispatch])
    
    return (
        
        <Container p={30} size="responsive" display="table">
             <Text c="dimmed" size="sm" ta="center" m={8}>
                        Do not have an account yet?{' '}
                        <Link to='/register'><Anchor size="sm" component="button">
                            Create account
                        </Anchor></Link>
            </Text>
            {
                message &&
                    <Alert variant="light" color="green"  title={message}>
                        <Text c="dimmed"> You may now login to polling application. </Text>
                    </Alert> 
            }{ errors?.length>0 &&       
                    <List withPadding mb={6}>
                        {errors.map((error:{type:string,value:string,msg:string},i:number)=>{
                            return <ListItem c="red" key={i}>{error.msg}</ListItem>
                        })}
                    </List> 
            }
            <Paper withBorder shadow="md" p={30} mt={30} w="30rem" radius="md">
                <TextInput label="Email"  id="email" placeholder="you@mail.com" required value={email} onChange={handleChange} />
                <PasswordInput label="Password"  id="password" placeholder="Your password" required mt="md" value={password} onChange={handleChange} />
                <Group justify="space-between" mt="lg">
                    {/* <Checkbox label="Remember me" />
                    <Anchor component="button" size="sm">
                        Forgot password?
                    </Anchor> */}
                </Group>
                <Button fullWidth mt="xl" onClick={handleLogin}>
                    Sign in
                </Button>
            </Paper>
        </Container>
    )
}

export default Login;