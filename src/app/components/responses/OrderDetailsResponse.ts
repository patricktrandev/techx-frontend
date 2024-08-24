import { ProductResponse } from "./ProductResponse"

export interface OrderDetailsResponse{
    id:number
    numberOfProduct:number
    price:number
    totalPayment:number
    url:string
    product:ProductResponse
    name:string
}