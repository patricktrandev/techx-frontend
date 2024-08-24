import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../components/enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiDetailsUserUrl = `${env.apiBaseUrl}/users/details`;
  apiUpdateUserUrl = `${env.apiBaseUrl}/users`;
  apiGetAllUsersByAdmin = `${env.apiBaseUrl}/users`;
  apiGetRequestResetPassword = `${env.apiBaseUrl}/users/reset/send-email`;
  apiCheckValidToken = `${env.apiBaseUrl}/users/token-valid`;
  apiResetPassword = `${env.apiBaseUrl}/users/reset-password`;
  apiUpdateRole = `${env.apiBaseUrl}/roles`;
  apiGetUserDetailsById = `${env.apiBaseUrl}/users`;
  emailLocalStorage = 'email';
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept-Language': 'en',
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  });
  constructor(private httpClient: HttpClient) {}
  getUserDetailsInLogin = (token: string) => {
    console.log(this.header);
    return this.httpClient.get(this.apiDetailsUserUrl, {
      headers: this.header,
    });
  };
  updateRoleByAdmin = (id: string, data: any): Observable<any> => {
    this.apiUpdateRole = `${env.apiBaseUrl}/roles/${id}`;
    return this.httpClient.put(this.apiUpdateRole, data, {
      headers: this.header,
    });
  };
  getUserDetails = (token: string): Observable<any> => {
    return this.httpClient.get(this.apiDetailsUserUrl, {
      headers: this.header,
    });
  };
  getUserDetailsById = (id: string): Observable<any> => {
    this.apiGetUserDetailsById = `${env.apiBaseUrl}/users/${id}`;

    return this.httpClient.get(this.apiGetUserDetailsById, {
      headers: this.header,
    });
  };
  getAllUsersByAdmin = (
    keyword: string,
    page: number,
    limit: number
  ): Observable<any> => {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page.toString())
      .set('limit', limit.toString());

    //console.log(header)
    return this.httpClient.get<any>(this.apiGetAllUsersByAdmin, {
      params: params,
      headers: this.header,
    });
  };

  forgotPassword = (data: any): Observable<any> => {
    //console.log(header)
    return this.httpClient.post(this.apiGetRequestResetPassword, data, {
      responseType: 'text',
    });
  };
  checkValidToken = (data: any): Observable<any> => {
    //console.log(header)
    return this.httpClient.post(this.apiCheckValidToken, data, {
      responseType: 'text',
    });
  };
  resetPassword = (data: any): Observable<any> => {
    //console.log(header)
    return this.httpClient.post(this.apiResetPassword, data, {
      responseType: 'text',
    });
  };
  updateUserDetails = (token: string, user: any): Observable<any> => {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    return this.httpClient.put(this.apiUpdateUserUrl, user, {
      headers: header,
    });
  };
  saveUserToLocalStorage(name: any) {
    try {
      if (name == null || !name) {
        return;
      }

      const userResponseJson = JSON.stringify(name);
      localStorage.setItem('username', userResponseJson);
    } catch (error) {
      console.error('Error saving user.', error);
    }
  }
  saveSomethingToLocalStorage(field: string, data: string) {
    try {
      if (data == null || !data) {
        return;
      }

      const userResponseJson = JSON.stringify(data);
      localStorage.setItem(field, userResponseJson);
    } catch (error) {
      console.error('Error saving user.', error);
    }
  }

  readDataFromLocalStorage(field: string) {
    try {
      const userResponse = localStorage.getItem(field);
      if (userResponse == null || !userResponse) {
        return;
      }

      const userResponseJson = JSON.parse(userResponse);
      const username = userResponseJson.replace('"', '');
      return username;
    } catch (error) {
      console.error('Error saving to local.', error);
    }
  }
  saveEmailToLocalStorage(name: any) {
    try {
      if (name == null || !name) {
        return;
      }

      const userResponseJson = JSON.stringify(name);
      localStorage.setItem(this.emailLocalStorage, userResponseJson);
    } catch (error) {
      console.error('Error saving email.', error);
    }
  }
  removeSomethingFromLocalStorage(field: string) {
    localStorage.removeItem(field);
  }

  getEmailFromLocalStorage() {
    try {
      const userResponse = localStorage.getItem(this.emailLocalStorage);
      if (userResponse == null || !userResponse) {
        return;
      }

      const userResponseJson = JSON.parse(userResponse);
      const username = userResponseJson.replace('"', '');
      return username;
    } catch (error) {
      console.error('Error saving user.', error);
    }
  }
  removeEmailFromLocalStorage() {
    localStorage.removeItem(this.emailLocalStorage);
  }
  getUserFromLocalStorage() {
    try {
      const userResponse = localStorage.getItem('username');
      if (userResponse == null || !userResponse) {
        return;
      }

      const userResponseJson = JSON.parse(userResponse);
      const username = userResponseJson.replace('"', '');
      return username;
    } catch (error) {
      console.error('Error saving user.', error);
    }
  }
  removeUserFromLocalStorage() {
    localStorage.removeItem('username');
  }
}
