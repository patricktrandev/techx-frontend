import { ToastrService } from 'ngx-toastr';
import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../Services/product/product.service';
import { OrderService } from '../../../Services/order/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderResponse } from '../../responses/OrderResponse';
import { OrderDetailsResponse } from '../../responses/OrderDetailsResponse';
import { env } from '../../enviroments/environment';
import { FormsModule, NgForm } from '@angular/forms';
import { OrderAdminComponent } from '../order-admin/order-admin.component';
import { ProductAdminComponent } from '../product-admin/product-admin.component';
import { CategoryAdminComponent } from '../category-admin/category-admin.component';
import { UserAdminComponent } from '../user-admin/user-admin.component';

@Component({
  selector: 'app-details-admin',
  standalone: true,
  imports: [SidebarComponent, AdminHeaderComponent,OrderAdminComponent, ProductAdminComponent, CategoryAdminComponent, UserAdminComponent, CommonModule, FormsModule],
  templateUrl: './details-admin.component.html',
  styleUrl: './details-admin.component.css'
})
export class DetailsAdminComponent {
   orderStatus=[
    {name:"PENDING", id:1},
    {name:"PROCESSING", id:2},
    {name:"SHIPPED", id:3},
    {name:"DELIVERED", id:4},
    {name:"CANCELLED", id:5},
  ]
  @ViewChild("orderAdminForm") orderAdminForm!:NgForm
  selectedStatus:string|null=""
  orderId:string| null=""
  currentCart:Map<number, number>= new Map();
  ids:string=""
  totalAmount:number=0
  order:any={}
  orderDetailsRes:OrderDetailsResponse[]=[]
  dateOrder:string=""
  status:string | null=""
  adminComponent:string ="orders"
  changeStatus(){}
  constructor(private productService:ProductService,  private orderService:OrderService, private route:ActivatedRoute, private toaster:ToastrService, private router:Router){

  }
  onClickSideBar(val:string){
    //this.adminComponent=val
    //this.router.navigate(['/dashboard'])
    console.log(this.adminComponent)
  }
  updateStatus(id:number){
    
    let statusData={
      status:this.selectedStatus
    }
    let val=this.selectedStatus?.localeCompare(this.order.status)
    console.log(val)
    console.log(statusData)
    if(val!=1){
      this.toaster.error("Choose status before updating", "Error", {closeButton:true, positionClass:'toast-top-center'})
      return ;
    }
    this.orderService.updateOrderStatusByAdmin(id,statusData).subscribe({
      next:(response:OrderResponse)=>{
        console.log(response)
        this.toaster.success("Updated status successfully", "Success", {closeButton:true, positionClass:'toast-top-center'})
        this.router.navigate(['/dashboard'])
       },
       complete:()=>{
 
       },
       error:(error:any)=>{
        this.toaster.error(error.error.message, "Error", {closeButton:true, positionClass:'toast-top-center'})
       }
    })
  }
  onSelectionChange(event: any) {
    this.selectedStatus = event.target.value;
  }
  getProductList(id:string){
    const index:number=parseInt(id)
    this.orderService.getDetailsOrder(index).subscribe({
      next:(response:OrderResponse)=>{
       const {orderDetails}=response
       this.order=response
       this.orderDetailsRes=orderDetails
      console.log(this.orderDetailsRes)
      //console.log(this.order)
       this.dateOrder=(this.order?.order_date).substr(0,10)
       this.selectedStatus=this.order.status
       this.orderDetailsRes.forEach((p: OrderDetailsResponse)=>{
        const {product}=p
        p.url=`${env.apiBaseUrl}/products/images/${product.thumbnail}`
        p.name=product.name
      })
      },
      complete:()=>{

      },
      error:(error:any)=>{
        this.toaster.error(error.error.message, "Error", {closeButton:true, positionClass:'toast-top-center'})
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
