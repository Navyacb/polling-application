import { Alert, Anchor, Button, Container, Group, List, ListItem, Paper, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { upperFirst} from '@mantine/hooks';
import { useErrorMessage } from '../../hooks/errorMessage/useErrorMessage';
import { useLocation } from 'react-router-dom';
import { useAuthenticateForm } from '../../hooks/authenticateForm/useAuthenticateForm';
import { useEffect } from "react";

const AuthenticationForm = ()=> {
  const location = useLocation()
  const emailReg = location?.state?.email
  const {form,handleFormSubmit,type,handleToggle} = useAuthenticateForm()
  const message = location?.state?.msg
  const {errors,errorsDispatch} = useErrorMessage()

    useEffect(()=>{
        errorsDispatch({type:'clear',payload:[]})
    },[errorsDispatch])
  

    return (
      <Container p={30} size="responsive" display="table">
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
        <Paper shadow="md" p={30} mt={30} w="30rem" radius="md" withBorder>
          <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
            <Stack>
              {type === 'register' && (
                <TextInput
                  required
                  label="Username"
                  placeholder="username"
                  value={form.values.username}
                  onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
                  radius="md"
                />
              )}
    
              <TextInput
                required
                label="Email"
                placeholder="hello@mail.com"
                value={emailReg || form.values.email}
                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                radius="md"
              />
    
              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                radius="md"
              />
            </Stack>
    
            <Group justify="space-between" mt="xl">
              <Anchor component="button" type="button" onClick={handleToggle} size="xs">
                {type === 'register'
                  ? 'Already have an account? Login'
                  : "Don't have an account? Register"}
              </Anchor>
              <Button type="submit" radius="xl">
                {upperFirst(type)}
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    )

}

export default AuthenticationForm