import { CategoryResponse } from "./CategoryResponse";

export interface ProductDetailsResponse{
    createdAt:string,
    updatedAt:string,
    id:number |null,
    name:string,
    price:number,
    thumbnail:string,
    description:string,
    isActive:number,
    category:CategoryResponse
    active:string
}