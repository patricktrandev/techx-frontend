import { Component, ViewChild } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../Services/user/user.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, RouterOutlet],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  @ViewChild("resetPasswordForm") resetPasswordForm!:NgForm
  email:string =""
  password:string=""
  confirmPassword=""
  constructor(private toaster: ToastrService, private router: Router,
    private userService:UserService
  ){}
  homeNavigate(){
    this.router.navigate(['./'])
  }

  resetPassword(){
    this.email=this.userService.getEmailFromLocalStorage()
    console.log(this.email)
    const resetPassword={
      email:this.email,
      new_password:this.password
    }
    if(!this.password){
      this.toaster.error("Password cannot be empty", "Error", {closeButton:true, positionClass:'toast-top-center'})
      return;
    }
    console.log(resetPassword)
    this.userService.resetPassword(resetPassword).subscribe({
      next:(response)=>{
        this.userService.removeEmailFromLocalStorage()
        
        this.toaster.success(response, "Success", {closeButton:true, positionClass:'toast-top-center'})
        this.router.navigate(["/login"])
      },
      complete:()=>{
      
        //debugger
      },
      error:(error:any)=>{
        console.log(error)
        this.toaster.error(error.error, "Error", {closeButton:true, positionClass:'toast-top-center'})
      }
    })
  }
  checkPasswordMatched(){

    if(this.password !== this.confirmPassword){
      this.resetPasswordForm.form.controls['confirmPassword'].setErrors({'passwordMismatch':true});

    }else{
      this.resetPasswordForm.form.controls['confirmPassword'].setErrors({'passwordMismatch':null});
    }
    console.log(this.resetPasswordForm.form.hasError('passwordMismatch'))
  }
}
