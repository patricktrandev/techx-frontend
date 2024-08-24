
import { Component, inject, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterOutlet } from '@angular/router';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterService } from '../../Services/user/register.service';
import { RegisterDTO } from '../dto/register.dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  @ViewChild("registerForm") registerForm!:NgForm;
  phone:string=""
  email:string=""
  password:string=""
  confirmPassword:string=""
  fullName:string=""
  dateOfBirth:string=""
  address:string=""
  isAccepted:boolean=false


 
  constructor(private registerService:RegisterService,  
              private router: Router,
              private toastr: ToastrService){
    
  }
  
  homeNavigate(){
    this.router.navigate(['./'])
  }
  register(){
    const userRegister:RegisterDTO={
      phone_number: this.phone,
      password: this.password,
      email:this.email,
      confirm_password:this.confirmPassword,
      fullname:this.fullName,
      date_of_birth:this.dateOfBirth,
      address:this.address,
      facebook_account_id:0,
      google_account_id:0,
      role_id:1
    }
    //console.log(userRegister)
    this.registerService.registerUser(userRegister).subscribe(
      {
        next:(response:any)=>{
          this.toastr.success(response, "Success",{closeButton:true, positionClass:'toast-top-center'})
          //console.log(response)
          //debugger
          this.router.navigate(["/login"])
        },
        complete:()=>{
          debugger
        },
        error:(err:any)=>{
          this.toastr.error(err.error, "Error",{closeButton:true, positionClass:'toast-top-center'} )
        }
      }
      
      
    );
    
  }
 
  
  checkPasswordMatched(){

    if(this.password !== this.confirmPassword){
      this.registerForm.form.controls['confirmPassword'].setErrors({'passwordMismatch':true});

    }else{
      this.registerForm.form.controls['confirmPassword'].setErrors({'passwordMismatch':null});
    }
    console.log(this.registerForm.form.hasError('passwordMismatch'))
  }
  checkAge(){
    if(this.dateOfBirth){
      const today=new Date();
      const birthday= new Date(this.dateOfBirth)
      let age=today.getFullYear()- birthday.getFullYear()

      if(age<18){
        this.registerForm.form.controls['dateOfBirth'].setErrors({'InvalidAge':true});
      }else{
        this.registerForm.form.controls['dateOfBirth'].setErrors({'InvalidAge':null});
      }
    }
  }


  loginNavigate():void{
    this.router.navigate(['/login'])
  }
}
