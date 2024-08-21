import { createContext } from "react";

export interface IUser{
        _id: string,
        username: string,
        email: string,
        //pollCreated: 
}

interface IUserAccount{
    userAccount : IUser,
    userAccountDispatch : React.Dispatch<{
        type: string;
        payload: IUser;
    }>,
}

export const defaultUserAccount: IUser = {
    _id: '',
    username: '',
    email: '',
    // pollCreated: ,
}

export const UserAccountContextData = createContext<IUserAccount>({
    userAccount : defaultUserAccount,
    userAccountDispatch : ()=>{},
})