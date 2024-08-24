import { Component } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";
import { FooterComponent } from '../../layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { TokenService } from '../../Services/user/token.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../Services/user/user.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, RouterOutlet, LoaderComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email:string =""
  isLoading:boolean = false;
  constructor(private toaster: ToastrService,private tokenService: TokenService, private router: Router,
    private userService:UserService
  ){}
  homeNavigate():void{
    this.router.navigate(['/register'])
  }
  loadData() {
    this.isLoading = true;
    
  }
  requestResetPassword(){
    
    const data={
      email:this.email
    }
    console.log(data)
    if(!this.email){
      this.toaster.error("Email is empty", "Error", {closeButton:true, positionClass:'toast-top-center'})
      return
    }
    this.loadData()
    this.userService.forgotPassword(data).subscribe({
      next:(response)=>{
        this.userService.saveEmailToLocalStorage(this.email)
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
        this.toaster.success(response, "Success", {closeButton:true, positionClass:'toast-top-center'})
        this.router.navigate(["/reset"])
      },
      complete:()=>{
      
        //debugger
      },
      error:(error:any)=>{
        console.log(error)
        this.toaster.error(error.error.message, "Error", {closeButton:true, positionClass:'toast-top-center'})
      }
    })
  }

}
