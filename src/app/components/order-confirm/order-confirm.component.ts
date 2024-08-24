import { ActivatedRoute } from '@angular/router';
import { OrderDetailsResponse } from './../responses/OrderDetailsResponse';
import { OrderService } from './../../Services/order/order.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { OrderTrackingComponent } from '../../layout/order-tracking/order-tracking.component';
import { ProductService } from '../../Services/product/product.service';
import { CartService } from '../../Services/cart/cart.service';
import { ProductResponse } from '../responses/ProductResponse';
import { env } from '../enviroments/environment';
import { OrderResponse } from '../responses/OrderResponse';

@Component({
  selector: 'app-order-confirm',
  standalone: true,
  imports: [CommonModule,HeaderComponent, FooterComponent, OrderTrackingComponent],
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.css'
})
export class OrderConfirmComponent {
  orderId:string| null=""
  currentCart:Map<number, number>= new Map();
  ids:string=""
  totalAmount:number=0
  order:any={}
  orderDetailsRes:OrderDetailsResponse[]=[]
  dateOrder:string=""
  constructor(private productService:ProductService, private cartService:CartService, private orderService:OrderService, private route:ActivatedRoute){

  }

  getProductList(id:string){
    const index:number=parseInt(id)
    this.orderService.getDetailsOrder(index).subscribe({
      next:(response:OrderResponse)=>{
       const {orderDetails}=response
       this.order=response
       this.orderDetailsRes=orderDetails
      //  console.log(this.orderDetailsRes)
      //  console.log(this.order)
       this.dateOrder=(this.order?.order_date).substr(0,10)
       
       this.orderDetailsRes.forEach((p: OrderDetailsResponse)=>{
        const {product}=p
        p.url=`${env.apiBaseUrl}/products/images/${product.thumbnail}`
        p.name=product.name
      })
      },
      complete:()=>{

      },
      error:(error:any)=>{

      }
    })
  }

  

  ngOnInit(){
    
    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('id');
    });
    
    this.getProductList(this.orderId!)
  }

}
