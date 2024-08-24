import { ToastrService } from 'ngx-toastr';
import { OrderService } from './../../../Services/order/order.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../Services/user/user.service';
import { Router } from '@angular/router';
import { OrderResponse } from '../../responses/OrderResponse';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ProductService } from '../../../Services/product/product.service';
import { CategoryResponse } from '../../responses/CategoryResponse';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../layout/pagination/pagination.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../layout/confirm-dialog/confirm-dialog.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';

@Component({
  selector: 'app-order-admin',
  standalone: true,
  imports: [CommonModule, FooterComponent,PaginationComponent, ConfirmDialogComponent,SidebarComponent, AdminHeaderComponent, FormsModule],
  templateUrl: './order-admin.component.html',
  styleUrl: './order-admin.component.css'
})
export class OrderAdminComponent {
   
  
  
 
  keyword:string =""
  page:number=0;
  limit:number=10
  orderList:any[]=[]
  totalElements:number=0;
  totalPages:number=0;
  
  constructor(public dialog: MatDialog, private orderService:OrderService, private toaster: ToastrService, private router : Router, private userService:UserService,private productService:ProductService){

  }

  orderDetailsAdminNavigate(id:number){
    this.router.navigate([`/admin/orders/${id}`])
  }
  getTotalPages(){
    return Math.floor(this.totalElements/this.limit)
  }
  searchProducts(){
    console.log(this.keyword)
    console.log(this.getTotalPages())
    this.getListOrderByKeyword(this.keyword, this.page, this.limit)
  }
  clearSearch() {
    this.keyword= '';
    this.getListOrderByKeyword(this.keyword, this.page, this.limit)
  }
  onPageChange(pageIndex:number){
   
    this.page=pageIndex;
    console.log(this.page)
    //console.log("total pages",this.totalPages)
    
    this.getListOrderByKeyword(this.keyword, this.page, this.limit)
  }
  getListOrderByKeyword(keyword:string, page:number, limit:number){
    this.orderService.getOrdersByAdmin(keyword,page, limit).subscribe({
      next:(response:any)=>{
        
        //console.log(response)
        const {orders, totalElements, totalPages}=response
        this.orderList=orders
        this.totalElements=totalElements
        this.totalPages=totalPages
        //console.log(response)
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
  

  openConfirmDialog(id:number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem(id);
      }
    });
  }

  deleteItem(id:number): void {
    this.orderService.deleteOrdersByAdmin(id).subscribe({
      next:(response:any)=>{
        //console.log(response)
        this.toaster.success(response, "Success", {closeButton:true, positionClass:'toast-top-center'})
        this.router.navigate(['/dashboard'])
      },
      complete:()=>{
        
      },
      error:(error:any)=>{
      
        console.log(error)
        this.toaster.error(error.error.message, "Error", {closeButton:true, positionClass:'toast-top-center'})
      }
    })
    console.log('Item deleted');
  }
  ngOnInit(){
    this.getListOrderByKeyword(this.keyword, this.page, this.limit)
    this.getTotalPages()
  }
}
