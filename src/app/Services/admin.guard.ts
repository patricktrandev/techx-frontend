import { UserResponse } from './../components/responses/UserResponse';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Token } from '@angular/compiler';
import { TokenService } from './user/token.service';
import { UserService } from './user/user.service';
import { env } from '../components/enviroments/environment';
 // Import your authentication service

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  userRole?:string |null
  constructor(private authService: AuthService, private router: Router, private tokenService:TokenService, private userService:UserService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const isTokenExpired = this.tokenService.isTokenExpired();
      this.userRole=this.userService.readDataFromLocalStorage(env
        .role
      )
      console.log(this.userRole)
      const isAdmin=this.userRole=='ADMIN'
      console.log(isAdmin)
    // Replace with your actual authentication check logic
    if (this.authService.isAuthenticated() && isTokenExpired && isAdmin) {
      return true;
    } else {
      // Redirect to login page if not authenticated
      this.router.navigate(['/login']);
      return false;
    }
  }
}
