import { TokenService } from '../../Services/user/token.service';
import { UserService } from '../../Services/user/user.service';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { UserResponse } from '../responses/UserResponse';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, NgForm } from '@angular/forms';
import { RegisterDTO } from '../dto/register.dto';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  @ViewChild('profileForm') profileForm!: NgForm;
  fullName: string = '';
  address: string = '';
  dateOfBirth: string = '';

  currentUser?: UserResponse;
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  loadUserSection() {
    const token = this.tokenService.getToken();
    console.log(token);
    this.userService.getUserDetails(token!).subscribe({
      next: (userRes: UserResponse) => {
        console.log(userRes);
        this.currentUser = userRes;
        this.address = this.currentUser?.address!;
        this.fullName = this.currentUser?.fullName!;
        this.dateOfBirth = this.currentUser?.dateOfBirth!;
      },
      complete: () => {},
      error: (error: any) => {
        console.log(error);
        this.toaster.error(error.error.message, 'Error', {
          closeButton: true,
          positionClass: 'toast-top-center',
        });
      },
    });
  }
  navigateMyOrder() {
    this.router.navigate(['/my-order']);
  }
  changeAddress() {}
  changeFullName() {}
  changeDateOfBirth() {}
  updateUser() {
    const user: any = {
      fullname: this.fullName,
      address: this.address,
      phone_number: this.currentUser?.phoneNumber,
      date_of_birth: this.dateOfBirth,
      facebook_account_id: 0,
      google_account_id: 0,
      role: this.currentUser?.role.id,
    };

    let val =
      user.fullname.localeCompare(this.currentUser?.fullName) ||
      user.address.localeCompare(this.currentUser?.address) ||
      user.date_of_birth.localeCompare(this.currentUser?.dateOfBirth);
    //console.log(val )
    if (val == 0) {
      this.toaster.error("You haven't updated your info", 'Error', {
        closeButton: true,
        positionClass: 'toast-top-center',
      });
      return;
    }
    //console.log(user)
    const token = this.tokenService.getToken();
    this.userService.updateUserDetails(token!, user).subscribe({
      next: (response: any) => {
        const { message } = response;
        this.toaster.success(message, 'Success', {
          closeButton: true,
          positionClass: 'toast-top-center',
        });
        this.router.navigate(['./']);
      },
      complete: () => {},
      error: (error: any) => {
        console.log(error);
        this.toaster.error(error.error.message, 'Error', {
          closeButton: true,
          positionClass: 'toast-top-center',
        });
      },
    });
  }
  ngOnInit() {
    this.loadUserSection();
  }
}
