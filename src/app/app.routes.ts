import { DetailsproductAdminComponent } from './components/admin/detailsproduct-admin/detailsproduct-admin.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailsProductComponent } from './components/details-product/details-product.component';
import { OrderComponent } from './components/order/order.component';
import { OrderConfirmComponent } from './components/order-confirm/order-confirm.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyOrderComponent } from './components/orders/my-order.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './Services/auth.guard';
import { AdminGuard } from './Services/admin.guard';
import { OrderAdminComponent } from './components/admin/order-admin/order-admin.component';
import { ProductAdminComponent } from './components/admin/product-admin/product-admin.component';
import { CategoryAdminComponent } from './components/admin/category-admin/category-admin.component';
import { UserAdminComponent } from './components/admin/user-admin/user-admin.component';
import { DetailsuserAdminComponent } from './components/admin/detailsuser-admin/detailsuser-admin.component';
import { DetailscategoriesAdminComponent } from './components/admin/detailscategories-admin/detailscategories-admin.component';
import { DetailsAdminComponent } from './components/admin/details-admin/details-admin.component';
import { ProductNewComponent } from './components/admin/product-new/product-new.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { OtpComponent } from './components/otp/otp.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'dashboard', redirectTo: 'admin/orders'},
    {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
    {path:'my-order', component: MyOrderComponent,canActivate:[AuthGuard]},
    {path:'admin/products/new', component: ProductNewComponent,canActivate:[AuthGuard]},
    {path:'login', component: LoginComponent},
    {path:'reset', component: OtpComponent},
    {path:'forgot/password', component: ForgotPasswordComponent},
    {path:'reset/password', component: ResetPasswordComponent},
    {path:'register', component: RegisterComponent},
    {path:'products/:id', component: DetailsProductComponent},
    {path:'orders', component: OrderComponent},
    {path:'orders/:id', component: OrderConfirmComponent},
    {path:'admin/orders', component: OrderAdminComponent, canActivate:[AdminGuard]},
    {path:'admin/orders/:id', component: DetailsAdminComponent, canActivate:[AdminGuard]},
    {path:'admin/products', component:ProductAdminComponent, canActivate:[AdminGuard]},
    {path:'admin/products/:id', component:DetailsproductAdminComponent, canActivate:[AdminGuard]},
    {path:'admin/categories', component: CategoryAdminComponent, canActivate:[AdminGuard]},
    {path:'admin/categories/:id', component: DetailscategoriesAdminComponent, canActivate:[AdminGuard]},
    {path:'admin/users', component: UserAdminComponent, canActivate:[AdminGuard]},
    {path:'admin/users/:id', component: DetailsuserAdminComponent, canActivate:[AdminGuard]},
    { path: '**', component: NotFoundComponent },
    
   
];
