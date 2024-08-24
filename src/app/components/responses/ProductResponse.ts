export interface ProductResponse{
    id:number
    name:string
    price:number
    thumbnail:string |undefined
    description:string
    created_at:string | undefined
    updated_at:string | undefined
    is_active:number
    category_id:number
    url:string,
    quantity:number
    totalValue:number 
    active:string
}