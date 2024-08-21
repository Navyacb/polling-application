import { createContext } from "react";

export interface IOptions{
    optionText : string,
}

export interface IPolls {
    question: string,
    category : string,
    startDate : Date | null,
    endDate : Date | null,
    options : IOptions[]
}

interface IPollData {
    polls : IPolls[],
    pollsDispatch : React.Dispatch<{
        type: string;
        payload: IPolls[];
    }>,
}

export const UserPollsContextData = createContext<IPollData>({
    polls : [],
    pollsDispatch : ()=>{}
})