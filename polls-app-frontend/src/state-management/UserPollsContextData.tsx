import { createContext } from "react";

export interface IOptions{
    optionText : string,
}

export interface IPolls {
    question: string,
    category : string,
    startDate : Date | null,
    endDate : Date  | null,
    options : IOptions[]
}

interface IPollData {
    polls : IPolls[],
}

export const UserPollsContextData = createContext<IPollData>({
    polls : [],
})