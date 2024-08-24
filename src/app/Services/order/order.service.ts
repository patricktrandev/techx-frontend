import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../components/enviroments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiCreateOrder=`${env.apiBaseUrl}/orders`
  apiGetDetailsOrder=`${env.apiBaseUrl}/orders/order`
  apiGetOrderByUserId=`${env.apiBaseUrl}/orders`
  apiGetOrderByKeyword=`${env.apiBaseUrl}/orders/get-orders-by-keyword`
  apiDeleteOrder=`${env.apiBaseUrl}/orders`
  apiUpdateOrder=`${env.apiBaseUrl}/orders`
  header= new HttpHeaders({'Content-Type':"application/json",'Accept-Language':'en', 'Authorization': 'Bearer ' + localStorage.getItem("access_token")})
  constructor(private HttpClient:HttpClient) { }
  placeOrder(orderData:any):Observable<any>{
    
    
    return this.HttpClient.post(this.apiCreateOrder,orderData, {headers:this.header});
  }

  getDetailsOrder(id:number):Observable<any>{
    this.apiGetDetailsOrder=`${env.apiBaseUrl}/orders/order/${id}`
    return this.HttpClient.get(this.apiGetDetailsOrder, {headers:this.header})
  }
  getOrdersByUserId(id:number){
    this.apiGetOrderByUserId=`${env.apiBaseUrl}/orders/${id}`
    return this.HttpClient.get(this.apiGetOrderByUserId,  {headers:this.header})
  }

  getOrdersByAdmin(keyword:string, page:number, limit:number):Observable<any>{
    const params = new HttpParams()
    .set('keyword', keyword)
    .set('page', page.toString())
    .set('limit', limit.toString());          
    
    return this.HttpClient.get(this.apiGetOrderByKeyword,  {params:params,headers:this.header})
  }
  deleteOrdersByAdmin(id:number):Observable<any>{
    this.apiDeleteOrder=`${env.apiBaseUrl}/orders/${id}`  
    
    return this.HttpClient.delete(this.apiDeleteOrder,  {headers:this.header, responseType: 'text'})
  }
  updateOrderStatusByAdmin(id:number, statusData:any):Observable<any>{
    this.apiUpdateOrder=`${env.apiBaseUrl}/orders/${id}/status`  
    
    return this.HttpClient.put(this.apiUpdateOrder, statusData, {headers:this.header})
  }
}
