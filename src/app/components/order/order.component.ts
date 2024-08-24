import { OrderService } from './../../Services/order/order.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CartService } from './../../Services/cart/cart.service';
import { ProductService } from './../../Services/product/product.service';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";
import { FooterComponent } from '../../layout/footer/footer.component';
import { OrderTrackingComponent } from '../../layout/order-tracking/order-tracking.component';
import { ProductResponse } from '../responses/ProductResponse';
import { env } from '../enviroments/environment';
import { FormsModule, NgForm,NgModel } from '@angular/forms';
import { OrderDTO } from '../dto/order.dto';
import { CartItemDTO } from '../dto/cartItem.dto';
import { Router } from '@angular/router';
import { TokenService } from '../../Services/user/token.service';
import { UserService } from '../../Services/user/user.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [HeaderComponent, HeaderComponent, FooterComponent, CommonModule,OrderTrackingComponent, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  currentUser:any

  @ViewChild("orderForm") orderForm!:NgForm
  name:string=""
  email:string=""
  phone:string =""
  shippingAddress:string=""
  note:string=""
  selectedShippingMethod:number=0
  selectedPaymentMethod:number=0
  shippingMethods=[
    {label:"EXPRESS", value:0},
    {label:"SAME-DAY SHIPPING", value:1},
    {label:"SAVING SHIPPING", value:2}
  ]
  paymentMethods=[
    {label:"COD", value:0},
    {label:"CREDIT CARD", value:1},
    {label:"PAYPAL", value:2},
    
    
  ]

  currentCart:Map<number, number>= new Map();
  ids:string=""
  totalAmount:number=0
  productList:ProductResponse[]=[]
  constructor(private productService:ProductService, private cartService:CartService, private orderService:OrderService, private toaster: ToastrService, private router : Router, private userService:UserService){

  }

  getProductList(){
    this.currentCart=this.cartService.getCart()
    for(const key of this.currentCart.keys()){
      this.ids+=key;
      this.ids+=","
    }
    if(!this.ids){
      return;
    }
    // console.log(this.ids)
    // console.log(this.currentCart)
    this.productService.getProductListByIds(this.ids).subscribe({
      next:(response:ProductResponse[])=>{
        this.productList=response
        console.log(this.productList)
        this.productList.forEach((product:ProductResponse) => {
          product.quantity= this.currentCart.get(product.id)!
          
          
          product.url=`${env.apiBaseUrl}/products/images/${product.thumbnail}`
          if(product.url.includes("null")){
          product.url="https://res.cloudinary.com/dctb1eocj/image/upload/v1723453744/avatar/logo_q8zea4.png"
          }
        });
      },
      complete:()=>{
        this.calculateTotal()
      },
      error:(error:any)=>{

      }
    })
  }
  getUser(){
    this.currentUser=this.userService.getUserFromLocalStorage()
    console.log(this.currentUser)
  }
  calculateTotal():void{
    this.totalAmount=this.productList.reduce((total,item)=>{
      return total+item.price*item.quantity
    },0)
  }
  navigateLogin(){
    this.router.navigate(['/login'])
  }
  navigateHome(){
    this.router.navigate(['./'])
  }

  createOrder():void{
   
    const cartItemList:CartItemDTO[]=[]
    for(const key of this.currentCart.keys()){
      const item:CartItemDTO={
        product_id:key,
        quantity:this.currentCart.get(key)!
      }
      cartItemList.push(item)
    }
    const order:OrderDTO={
      user_id:this.currentUser.id,
      fullname:this.name,
      email:this.email,
      phone_number:this.phone,
      shipping_address:this.shippingAddress,
      shipping_method:this.shippingMethods[this.selectedShippingMethod].label,
      payment_method:this.paymentMethods[this.selectedPaymentMethod].label,
      note:this.note,
      total_payment:this.totalAmount,
      cart_items:cartItemList


    }
    
    
    // console.log(cartItemList)
    console.log(order)
    this.orderService.placeOrder(order).subscribe({
      next:(respone:any)=>{
        //console.log(respone)
        
        this.toaster.success("Order created successfully", "Success", {closeButton:true, positionClass:'toast-top-center'})
        this.router.navigate(['./'])
      },
      complete:()=>{

        this.cartService.clearCart()
      },
      error:(error:any)=>{
        console.log(error)
        this.toaster.success("error", "Error", {closeButton:true, positionClass:'toast-top-center'})
      }

    })
  }
  ngOnInit(){
    this.getProductList()
    this.getUser()
  }
}
