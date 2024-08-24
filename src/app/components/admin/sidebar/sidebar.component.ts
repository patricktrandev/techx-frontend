import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  componentName:string=""
  @Output() notifyComponent: EventEmitter<string> = new EventEmitter<string>();
  constructor(private router:Router){

  }
 
  dashboardNavigate(){
    this.router.navigate(['/dashboard'])
  }
  homeNavigate(){
    this.router.navigate(['./'])
  }
  orderAdminNavigate(){
    this.router.navigate([`/admin/orders`])
  }
  productAdminNavigate(){
    this.router.navigate([`/admin/products`])
  }
  userAdminNavigate(){
    this.router.navigate([`/admin/users`])
  }
  categoryAdminNavigate(){
    this.router.navigate([`/admin/categories`])
  }
}
