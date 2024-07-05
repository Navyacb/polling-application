import './App.css'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import Header from './components/header/Header';
import { ErrorMessageContextData, IError } from './state-management/ErrorMessageContextData';
import { useEffect, useMemo, useReducer } from 'react';
import { IUser, UserAccountContextData, defaultUserAccount } from './state-management/UserAccountContextData';
import { verifyToken } from './api/pollingAppApiMock';
import { useQuery } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

function App() {

  const errorReducer = (state:IError[],action:{ type: string, payload: IError[]})=>{
    switch(action.type){
        case 'add':
          return action.payload
        case 'clear':
          return []
        default:
          return state
    }
  }

  const userAccountReducer = (state:IUser,action:{ type: string, payload: IUser})=>{
    switch(action.type){
      case 'add':
        return action.payload
      case 'remove':
        return defaultUserAccount
      default:
        return state
    }
  }

  const [errors,errorsDispatch] = useReducer(errorReducer,[] )
  const [userAccount,userAccountDispatch] = useReducer(userAccountReducer,defaultUserAccount)


const { data, error } = useQuery('verifyToken', verifyToken, {
  retry: false, 
  refetchOnWindowFocus: false,
})


useEffect(()=>{
  if (data) {
    if (data.valid) {
        userAccountDispatch({ type: 'add', payload: data.user })
    } else {
        userAccountDispatch({ type: 'remove', payload: defaultUserAccount })
    }
  } else if (error) {
      userAccountDispatch({ type: 'remove', payload: defaultUserAccount })
  }
},[data, error])

const errorMessageContextValue = useMemo(
  () => ({ errors, errorsDispatch }),
  [errors, errorsDispatch]
)

const userAccountContextValue = useMemo(
  () => ({ userAccount, userAccountDispatch }),
  [userAccount, userAccountDispatch]
)



  return (
    <BrowserRouter>
      <MantineProvider>
          <ErrorMessageContextData.Provider value = {errorMessageContextValue}>
            <UserAccountContextData.Provider value={userAccountContextValue}>
              <Header/>
            </UserAccountContextData.Provider>
          </ErrorMessageContextData.Provider>
      </MantineProvider>
    </BrowserRouter>
  )
}

export default App
