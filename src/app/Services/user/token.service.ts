import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY:string='access_token'
  constructor() { }
  getToken():string | null{
    return localStorage.getItem(this.TOKEN_KEY);
  }
  setToken(token:string):void{
    localStorage.setItem(this.TOKEN_KEY, token)
  }
  removeToken():void{
    localStorage.removeItem(this.TOKEN_KEY)
  }
  isTokenExpired(): boolean { 
    if(this.getToken() == null) {
        return false;
    }       
    return true;
}
  
}
