import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../../components/dto/login.dto';
import { Observable } from 'rxjs';
import { env } from '../../components/enviroments/environment';
import { Role } from '../../components/responses/RoleResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl=`${env.apiBaseUrl}/users/login`
  apiRoleUrl=`${env.apiBaseUrl}/roles`
  header= new HttpHeaders({'Content-Type':"application/json",'Accept-Language':'en'})
  constructor(private http:HttpClient) { }
  loginUser=(data:LoginDTO)=>{
    return this.http.post(this.apiUrl, data,{headers:this.header})
  }

  getAllRoles=():Observable<any>=>{
    return this.http.get<Role[]>(this.apiRoleUrl)
  }
}
