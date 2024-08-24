import { LoginService } from './../../../Services/user/login.service';
import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../Services/user/user.service';
import { TokenService } from '../../../Services/user/token.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UserResponse } from '../../responses/UserResponse';
import { Role } from '../../responses/RoleResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detailsuser-admin',
  standalone: true,
  imports: [SidebarComponent, AdminHeaderComponent, FormsModule, CommonModule],
  templateUrl: './detailsuser-admin.component.html',
  styleUrl: './detailsuser-admin.component.css',
})
export class DetailsuserAdminComponent {
  fullName: string = '';
  address: string = '';
  dateOfBirth: string = '';
  currentUser?: UserResponse;
  roles: Role[] = [];
  selectedRole: number | undefined;
  userId?: string | null;
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    private toaster: ToastrService,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {}

  changeRole() {}
  loadUser() {
    const token = this.tokenService.getToken();
    console.log(token);
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
    });
    this.userService.getUserDetailsById(this.userId!).subscribe({
      next: (userRes: UserResponse) => {
        this.currentUser = userRes;
        console.log(this.currentUser);
        this.address = this.currentUser?.address!;
        this.fullName = this.currentUser?.fullName!;
        this.dateOfBirth = this.currentUser?.dateOfBirth!;
        this.selectedRole = this.currentUser.role.id;
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

  getRoles() {
    this.loginService.getAllRoles().subscribe({
      next: (response: Role[]) => {
        console.log(response);
        this.roles = response;
      },
      complete: () => {},
      error: (error: any) => {
        console.log(error);
        this.toaster.error(error.error, 'Error', {
          closeButton: true,
          positionClass: 'toast-top-center',
        });
      },
    });
  }
  updateRole() {
    const user = {
      role: this.selectedRole,
    };
    if (user.role == this.currentUser?.role.id) {
      this.toaster.error('Please choose new role before updating', 'Error', {
        closeButton: true,
        positionClass: 'toast-top-center',
      });
      return;
    }
    console.log(user);
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
    });
    this.userService.updateRoleByAdmin(this.userId!, user).subscribe({
      next: (response) => {
        console.log(response);
        this.toaster.success('User updates successfully', 'Success', {
          closeButton: true,
          positionClass: 'toast-top-center',
        });
        this.router.navigate(['/admin/users']);
      },
      complete: () => {},
      error: (error: any) => {
        console.log(error);
        this.toaster.error(error.error, 'Error', {
          closeButton: true,
          positionClass: 'toast-top-center',
        });
      },
    });
  }
  ngOnInit() {
    this.loadUser();
    this.getRoles();
  }
}
