import { createContext } from "react";

export interface ICategory {
    categoryName : string,
}

interface ICategoryData {
    category : ICategory[],
}

export const CategoryContextData = createContext<ICategoryData>({
    category : []
})