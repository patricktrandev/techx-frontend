import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator"

export class RegisterDTO{
    @IsPhoneNumber()
    phone_number: string
    @IsString()
    @IsString()
    @IsNotEmpty()
    password: string
    @IsString()
    @IsNotEmpty()
    email: string
    @IsString()
    @IsNotEmpty()
    confirm_password:string
    @IsString()
    fullname:string
    date_of_birth:string
    @IsString()
    address:string
    facebook_account_id:number=0
    google_account_id:number=0
    role_id:number=1
    constructor(data:any){
        this.phone_number=data.phone_number
        this.email=data.email
        this.password=data.password
        this.confirm_password=data.confirm_password
        this.fullname=data.fullname
        this.date_of_birth=data.date_of_birth
        this.address=data.address
        this.facebook_account_id=data.facebook_account_id || 0
        this.google_account_id=data.google_account_id || 0
        this.role_id=data.role_id || 1
    }
}