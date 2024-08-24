import { OrderDetailsResponse } from "./OrderDetailsResponse"

export interface OrderResponse{
    id:number
    email:string
    fullname:string
    isActive:number
    note:string
    orderDate:string
    payment_method:string
    phone_number:string
    shipping_address:string
    shipping_method:string
    shipping_date:string
    status:string
    total_payment:number
    trackingNumber: string
    user_id:number
    orderDetails:OrderDetailsResponse[]

    
}