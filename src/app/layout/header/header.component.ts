import { ToastrService } from 'ngx-toastr';
import { TokenService } from './../../Services/user/token.service';
import { CommonModule } from '@angular/common';
import { UserResponse } from './../../components/responses/UserResponse';
import { UserService } from './../../Services/user/user.service';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { env } from '../../components/enviroments/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  roleName:string |null=""
  name:string |null=""
  userResponse?:UserResponse
  constructor(private router: Router, private userService:UserService, private tokenService:TokenService, private toaster:ToastrService) {}
  loginNavigate():void{
    this.router.navigate(['/login'])
  }
  homeNavigate():void{
    this.router.navigate(['./'])
  }
  profileNavigate():void{
    this.router.navigate(['/profile'])
  }
  myOrderNavigate():void{
    this.router.navigate(['/my-order'])
  }
  cartNavigate():void{
    this.router.navigate(['/orders'])
  }
  dashboardNavigate():void{
    this.router.navigate(['/dashboard'])
  }
  getUserName(){
    this.name=this.userService.getUserFromLocalStorage()
    this.roleName=this.userService.readDataFromLocalStorage(env.role)
    //console.log(user)
    
    //console.log(this.username)
  }
  
  logout(){
    this.tokenService.removeToken()
    this.userService.removeSomethingFromLocalStorage("username")
    this.userService.removeSomethingFromLocalStorage(env.role)
 
    this.toaster.success("Logout successfully", "Success", {closeButton:true, positionClass:'toast-top-center'})
    this.router.navigate(['/login'])
  }
 
  ngOnInit(){
    
    this.getUserName()
  }
  
}
