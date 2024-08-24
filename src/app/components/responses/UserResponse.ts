import { Role } from "./RoleResponse"

export interface UserResponse{
    id:number
    fullName:string
    phoneNumber:string
    address:string
    is_active:number
    dateOfBirth:string
    role:Role
    active:string
}