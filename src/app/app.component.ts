import { DetailsuserAdminComponent } from './components/admin/detailsuser-admin/detailsuser-admin.component';
import { ComponentsModule } from './components/components.module';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from "./components/order/order.component";
import { OrderConfirmComponent } from './components/order-confirm/order-confirm.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailsProductComponent } from './components/details-product/details-product.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './components/profile/profile.component';
import { MyOrderComponent } from './components/orders/my-order.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { DetailsproductAdminComponent } from './components/admin/detailsproduct-admin/detailsproduct-admin.component';
import { DetailscategoriesAdminComponent } from './components/admin/detailscategories-admin/detailscategories-admin.component';
import { DetailsAdminComponent } from './components/admin/details-admin/details-admin.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule,HomeComponent, OrderComponent,DashboardComponent , ComponentsModule, OrderConfirmComponent, LoginComponent, RegisterComponent, DetailsProductComponent, ProfileComponent, MyOrderComponent, DetailsproductAdminComponent, DetailscategoriesAdminComponent, DetailsuserAdminComponent, DetailsAdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shop-app';
}
