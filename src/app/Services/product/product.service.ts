import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../components/enviroments/environment';
import { Observable } from 'rxjs';
import { ProductDetailsResponse } from '../../components/responses/ProductDetailsResponse';
import { ProductDetailsImageResponse } from '../../components/responses/ProductDetailsImageResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiGetAllProductsUrl=`${env.apiBaseUrl}/products`
  apiGetAllCategoriesUrl=`${env.apiBaseUrl}/categories`
  apiGetProductDetailsUrl=`${env.apiBaseUrl}/products`
  apiDeleteProductDetailsUrl=`${env.apiBaseUrl}/products`
  apiGetProductDetailsImageUrl=`${env.apiBaseUrl}/products`
  apiGetProductListByIdList=`${env.apiBaseUrl}/products/by-ids`
  apiUpdateProductByAdmin=`${env.apiBaseUrl}/products`
  apiCreateProductWithUploadImage=`${env.apiBaseUrl}/products/products-upload`
  apiCreateProductNoImage=`${env.apiBaseUrl}/products`
  apiCreateImageOfProduct=`${env.apiBaseUrl}/products/uploads`
  header= new HttpHeaders({'Content-Type':"application/json",'Accept-Language':'en', 'Authorization': 'Bearer ' + localStorage.getItem("access_token")})
  postHeader= new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem("access_token"), responseType:'text'})
  constructor(private HttpClient:HttpClient) { }
  
  getProducts(page:number, limit:number, categoryId:number, keyword:string):Observable<any>{
    this.apiGetAllProductsUrl=`${env.apiBaseUrl}/products?page=${page}&limit=${limit}&keyword=${keyword}&category_id=${categoryId}`
    return this.HttpClient.get<any[]>(this.apiGetAllProductsUrl)
  }
  getAllCategories():Observable<any>{
    return this.HttpClient.get<any[]>(this.apiGetAllCategoriesUrl)
  }
  getProductDetailsById(id:number):Observable<any>{
    this.apiGetProductDetailsUrl=`${env.apiBaseUrl}/products/${id}`
    return this.HttpClient.get<ProductDetailsResponse>(this.apiGetProductDetailsUrl);
  }
  getProductDetailsImageByProductId(id:number):Observable<any>{
    this.apiGetProductDetailsImageUrl=`${env.apiBaseUrl}/products/${id}/images-list`
    return this.HttpClient.get<ProductDetailsImageResponse>(this.apiGetProductDetailsImageUrl);
  }
  getProductListByIds(productsIds:string):Observable<any>{
    let params= new HttpParams();
    params=params.append('ids', productsIds);
    return this.HttpClient.get<any[]>(this.apiGetProductListByIdList, {params:params})
  }
  deleteProductDetailsByAdmin(id:number):Observable<any>{
    this.apiDeleteProductDetailsUrl=`${env.apiBaseUrl}/products/${id}`
    return this.HttpClient.delete(this.apiDeleteProductDetailsUrl,  {headers:this.header, responseType: 'text'})
  }
  updateProductDetailsByAdmin(id:number, data:any):Observable<any>{
    this.apiUpdateProductByAdmin=`${env.apiBaseUrl}/products/${id}`
    return this.HttpClient.put(this.apiUpdateProductByAdmin,data , {headers:this.header})
  }

  uploadProductWithImage(product: any, files: File[]): Observable<any> {
    
    
    //debugger
    const formData: FormData = new FormData();
    formData.append('product', new Blob([JSON.stringify( product)], {
      type: 'application/json'
  }));
    //debugger
    files.forEach(file => {
      formData.append('productImage', file, file.name);
    });
    console.log(formData.get('product'))
//debugger
    return this.HttpClient.post(this.apiCreateProductWithUploadImage, formData,{headers:this.postHeader, responseType:'text'});
  }
  createProduct(product:any): Observable<any> {
    return this.HttpClient.post(this.apiCreateProductNoImage, product,{headers:this.header});
  }
  addImagesOfProduct(id:number, files:File[]): Observable<any> {
    const formData: FormData = new FormData();
    console.log(files.length)
    files.forEach(file => {
      formData.append('files', file, file.name);
    });
    console.log(formData.get('files'))
    this.apiCreateImageOfProduct=`${env.apiBaseUrl}/products/save-image/${id}`
    return this.HttpClient.post(this.apiCreateImageOfProduct, formData,{headers:this.postHeader,  responseType: 'text'});
  }
  
}
