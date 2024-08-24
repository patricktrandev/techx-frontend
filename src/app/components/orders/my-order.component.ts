import { OrderService } from './../../Services/order/order.service';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Services/user/user.service';
import { TokenService } from '../../Services/user/token.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UserResponse } from '../responses/UserResponse';
import { OrderResponse } from '../responses/OrderResponse';

@Component({
  selector: 'app-my-order',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, RouterOutlet],
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.css'
})
export class MyOrderComponent {
  
  currentUser?:UserResponse
  orderList:OrderResponse[]=[]
  constructor(private userService:UserService, private tokenService:TokenService, private router:Router, private toaster: ToastrService, private OrderService:OrderService, private route:ActivatedRoute){
  }
  getListOrder(){
      const user=this.userService.getUserFromLocalStorage()
      const {id}=user
      this.currentUser=user
      console.log(this.currentUser)
      console.log(id)

      this.OrderService.getOrdersByUserId(id).subscribe({
        next:(response:any)=>{
          //console.log(response)
          this.orderList=response
          //console.log(this.orderList)
          this.orderList.forEach((p: OrderResponse)=>{
            p.shipping_date=p.shipping_date.substr(0,10)
  
          })
        },
        complete:()=>{
          
        },
        error:(error:any)=>{
        
          console.log(error)
          this.toaster.error(error.error.message, "Error", {closeButton:true, positionClass:'toast-top-center'})
        }
  
      })
  }
  navigateOrderDetails(id:number){
    this.router.navigate([`/orders/${id}`])
  }
  ngOnInit(){
   this.getListOrder()
    
    
  }

}
