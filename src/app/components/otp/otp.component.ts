import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../Services/user/user.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,CommonModule,RouterOutlet,FormsModule, LoaderComponent],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {
  @ViewChild('input1',{read: ElementRef, static: true}) input1: ElementRef<HTMLInputElement> |any;
  @ViewChild('input2') input2: ElementRef<HTMLInputElement> |any;
  @ViewChild('input3') input3: ElementRef<HTMLInputElement> |any;
  @ViewChild('input4') input4: ElementRef<HTMLInputElement> |any;
  @ViewChild('input3') input5: ElementRef<HTMLInputElement> |any;
  @ViewChild('input4') input6 : ElementRef<HTMLInputElement>|any;
  otp:string =""
  isLoading = false;
  
  constructor(private toaster: ToastrService, private router: Router,
    private userService:UserService
  ){}
  homeNavigate(){
    this.router.navigate(['./'])
  }
  loadData() {
    this.isLoading = true;
    
  }
  
  checkValidToken(){
    this.otp=`${this.input1}${this.input2}${this.input3}${this.input4}${this.input5}${this.input6}`
    let regex = /[a-z]/;
    if(regex.test(this.otp) ){
      this.toaster.error("Invalid otp form.")
      return;
    }
    if(this.otp.includes("undefined")){
      this.toaster.error("Invalid otp form.")
      return;
    }
    if(this.otp.includes(" ")){
      this.toaster.error("Invalid otp")
      return;
    }
    const data={
      otp:this.otp,
      email:this.userService.getEmailFromLocalStorage()
    }
    console.log(data)
    this.loadData()
    this.userService.checkValidToken(data).subscribe({
      next:(response)=>{
        
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
        // this.toaster.success(response, "Success", {closeButton:true, positionClass:'toast-top-center'})
        this.router.navigate(["/reset/password"])
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
 
  ngAfterViewInit() {
    this.input1?.nativeElement.focus();
    
  }
  
  
  onDigitInput(event:any){

    let element;
    if (event.code !== 'Backspace')
         element = event.srcElement.nextElementSibling;
 
     if (event.code === 'Backspace')
         element = event.srcElement.previousElementSibling;
 
     if(element == null)
         return;
     else
         element.focus();
 }
}
