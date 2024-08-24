import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { OrderAdminComponent } from '../order-admin/order-admin.component';
import { ProductAdminComponent } from '../product-admin/product-admin.component';
import { CategoryAdminComponent } from '../category-admin/category-admin.component';
import { UserAdminComponent } from '../user-admin/user-admin.component';
import { CommonModule } from '@angular/common';
import { DetailsAdminComponent } from '../details-admin/details-admin.component';
import { DetailsProductComponent } from '../../details-product/details-product.component';
import { DetailsuserAdminComponent } from '../detailsuser-admin/detailsuser-admin.component';
import { DetailsproductAdminComponent } from '../detailsproduct-admin/detailsproduct-admin.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, AdminHeaderComponent, OrderAdminComponent, ProductAdminComponent, CategoryAdminComponent, UserAdminComponent, CommonModule,DetailsAdminComponent, DetailsproductAdminComponent, DetailsuserAdminComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  adminComponent:string ="orders"

  constructor(private router:Router){

  }
  onSidebarClick(val:string){
    this.adminComponent=val
    //console.log(this.adminComponent)
  }
 
}
