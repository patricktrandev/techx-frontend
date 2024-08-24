import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../../../Services/user/user.service';
import { TokenService } from '../../../Services/user/token.service';
import { ToastrService } from 'ngx-toastr';
import { env } from '../../enviroments/environment';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  username:string|null=""
  roleName:string |null=""
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
    this.username=this.userService.getUserFromLocalStorage()
    this.roleName=this.userService.readDataFromLocalStorage(env.role)
    //console.log(user)
    
    //console.log(this.username)
  }
  logout(){
    this.tokenService.removeToken()
    this.userService.removeUserFromLocalStorage()
    this.toaster.success("Logout successfully", "Success", {closeButton:true, positionClass:'toast-top-center'})
    this.router.navigate(['/login'])
  }
  ngOnInit(){
    this.getUserName()
  }
}
