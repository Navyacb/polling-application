import './App.css'
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import '@mantine/core/styles.css';
import Header from './components/header/Header';
import { ErrorMessageContextData, IError } from './state-management/ErrorMessageContextData';
import { useEffect, useReducer } from 'react';
import { IUser, UserAccountContextData, defaultUserAccount } from './state-management/UserAccountContextData';
import { verifyToken } from './api/pollingAppApiMock';

function App() {
 // const navigate = useNavigate()

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

//   useEffect(() => {
//     const interval = setInterval(async () => {
//         
//     }, 5000)try {
//             const { valid, user } = await verifyToken();
//             if (!valid) {
//               userAccountDispatch({type:'remove',payload:defaultUserAccount})
//              //   navigate('/login');
//             }else{
//               userAccountDispatch({ type: 'add', payload: user });
//             }
//         } catch (error) {
//           userAccountDispatch({type:'remove',payload:defaultUserAccount})
//           console.error('Unexpected error:', error)
//          //   navigate('/login');
//         }

//     return () => clearInterval(interval)
// }, []);

useEffect(()=>{
  (async ()=>{
    try {
      const { valid, user } = await verifyToken();
      if (!valid) {
        userAccountDispatch({type:'remove',payload:defaultUserAccount})
        //   navigate('/login');
      }else{
        userAccountDispatch({ type: 'add', payload: user });
      }
    } catch (error) {
      userAccountDispatch({type:'remove',payload:defaultUserAccount})
      console.error('Unexpected error:', error)
       //   navigate('/login');
    }
  })()
})




  return (
    <MantineProvider>
      <BrowserRouter>
        <ErrorMessageContextData.Provider value = {{errors,errorsDispatch}}>
          <UserAccountContextData.Provider value={{userAccount,userAccountDispatch}}>
            <Header/>
          </UserAccountContextData.Provider>
        </ErrorMessageContextData.Provider>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
