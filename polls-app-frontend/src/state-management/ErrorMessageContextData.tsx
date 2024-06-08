import { createContext } from "react";


export interface IError {
    type:string,
    value:string,
    msg:string
}

export interface IErrorMessage {
    errors: IError[],
    errorsDispatch : React.Dispatch<{
        type: string;
        payload: IError[];
    }>,
}


export const ErrorMessageContextData = createContext<IErrorMessage>({
    errors: [],
    errorsDispatch : ()=>{},

})