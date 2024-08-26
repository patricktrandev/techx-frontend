import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { UserService } from './../../Services/user/user.service';
import { Router, RouterOutlet } from '@angular/router';
import { TokenService } from './../../Services/user/token.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './../../Services/user/login.service';
import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { LoginDTO } from '../dto/login.dto';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginResponse } from '../responses/LoginResponse';
import { Role } from '../responses/RoleResponse';
import { UserResponse } from '../responses/UserResponse';
import { env } from '../enviroments/environment';
import { LoaderComponent } from '../loader/loader.component';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CommonModule,
    FormsModule,
    LoaderComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  phone: string = '';
  password: string = '';
  roles: Role[] = [];
  userRole: string = '';
  username: string = '';
  rememberMe: boolean = true;
  selectedRole: Role | undefined;
  userResponse?: UserResponse;
  tokenLogin: string | null = '';

  apiDetailsUserUrl = `${env.apiBaseUrl}/users/details`;
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept-Language': 'en',
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  });
  constructor(
    private loginService: LoginService,
    private toaster: ToastrService,
    private tokenService: TokenService,
    private router: Router,
    private userService: UserService,
    private httpClient: HttpClient
  ) {}
  registerNavigate(): void {
    this.router.navigate(['/register']);
  }

  loginUser(userLogin: any): Observable<any> {
    return this.loginService.loginUser(userLogin);
  }

  login() {
    const userLogin: LoginDTO = {
      phone_number: this.phone,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1,
    };

    //console.log(userLogin)
    this.loginService.loginUser(userLogin).subscribe({
      next: (response: any) => {
        const { message, token, id, username, roles } = response.data;
        this.userRole = response.data.roles.name!;

        this.tokenService.setToken(response.data.token);
        this.userService.saveSomethingToLocalStorage(
          env.role,
          response.data.roles.name
        );
        this.userService.saveSomethingToLocalStorage(env.id, response.data.id);
        this.userService.saveUserToLocalStorage(response.data.username);
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

  homeNavigate() {
    this.router.navigate(['./']);
  }
  forgotPasswordNavigate() {
    this.router.navigate(['/forgot/password']);
  }

  getRoles() {
    this.loginService.getAllRoles().subscribe({
      next: (response: Role[]) => {
        console.log(response);
        this.roles = response;
        this.selectedRole = this.roles.length > 0 ? this.roles[0] : undefined;
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
    this.getRoles();
  }
}
