import { IsNotEmpty, IsPhoneNumber } from "class-validator";
import { CartItemDTO } from "./cartItem.dto";

export class OrderDTO{
    @IsNotEmpty()
    fullname:string
    @IsPhoneNumber()
    phone_number:string;
    user_id:number
    email:string
    shipping_address:string
    note:string
    total_payment:number
    payment_method:string
    shipping_method:string
    cart_items:CartItemDTO[]
    constructor(data:any){
        this.fullname=data.name
        this.phone_number=data.phone_number
        this.user_id=data.user_id
        this.email=data.email
        this.shipping_address=data.shipping_address
        this.shipping_method=data.shipping_method
        this.note=data.note
        this.total_payment=data.total_payment
        this.payment_method=data.payment_method
        this.cart_items=data.cart_items
    }


}