import { Injectable } from '@angular/core';
import { UserService } from './user/user.service';
import { TokenService } from './user/token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false; // Example property to track authentication status

  constructor(private userService:UserService, private tokenService:TokenService) { }

  isAuthenticated(): boolean {
    const user=this.tokenService.getToken()
    if(user){
      this.loggedIn=true
    }
    // Replace this with actual authentication logic (e.g., checking tokens or session)
    return this.loggedIn;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
