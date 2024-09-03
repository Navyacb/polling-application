import { createContext } from "react";

export interface ICategory {
    categoryName : string,
    _id: string
}

interface ICategoryData {
    category : ICategory[],
}

export const CategoryContextData = createContext<ICategoryData>({
    category : []
})