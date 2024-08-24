import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../../components/dto/register.dto';
import { env } from '../../components/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  apiUrlRegister=`${env.apiBaseUrl}/users/register`;
  headers= new HttpHeaders({'Content-Type':'application/json', 'Accept-Language':'en'})
  constructor(private http:HttpClient, private route: Router) { }

  registerUser(dataUser:RegisterDTO):Observable<any>{
    return this.http.post(this.apiUrlRegister, dataUser, {headers:this.headers, responseType: 'text'})
            
  }
}
