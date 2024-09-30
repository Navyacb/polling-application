import './App.css'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import Header from './components/header/Header';
import { ErrorMessageContextData, IError } from './state-management/ErrorMessageContextData';
import { useEffect, useMemo, useReducer } from 'react';
import { IUser, UserAccountContextData, defaultUserAccount } from './state-management/UserAccountContextData';
import { fetchCategoryList, fetchActivePollsData, verifyToken } from './api/pollingAppApiMock';
import { useQuery } from 'react-query';
import { CategoryContextData } from './state-management/CategoryContextData';
import { BrowserRouter } from 'react-router-dom';
import { UserPollsContextData } from './state-management/UserPollsContextData';
import { Notifications } from '@mantine/notifications'

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

const {data:category = []} = useQuery({
  queryFn : ()=>fetchCategoryList(),
  queryKey : ["category"],
})

const {data:polls = []}= useQuery({
  queryFn : ()=>fetchActivePollsData(),
  queryKey : ["polls"]
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
        <Notifications/>
          <ErrorMessageContextData.Provider value = {errorMessageContextValue}>
            <UserAccountContextData.Provider value={userAccountContextValue}>
              <CategoryContextData.Provider value={{category}}>
                <UserPollsContextData.Provider value={{polls}}>
                  <Header/>
                </UserPollsContextData.Provider>
              </CategoryContextData.Provider>
            </UserAccountContextData.Provider>
          </ErrorMessageContextData.Provider>
      </MantineProvider>
    </BrowserRouter>
  )
}

export default App
