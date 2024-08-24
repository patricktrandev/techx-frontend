import { CartService } from './../../Services/cart/cart.service';
import { ProductDetailsImageResponse } from './../responses/ProductDetailsImageResponse';
import { LoginResponse } from './../responses/LoginResponse';
import { ProductService } from './../../Services/product/product.service';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../layout/breadcrumbs/breadcrumbs.component';
import { ProductDetailsResponse } from '../responses/ProductDetailsResponse';

import { env } from '../enviroments/environment';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-product',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, BreadcrumbsComponent],
  templateUrl: './details-product.component.html',
  styleUrl: './details-product.component.css'
})
export class DetailsProductComponent {
  productId: string | null= '';
  productIndex:number=0
  productDetails:any={}
  currentImgIndex:number=0
  quantity:number=1
  productDetailsImageList:ProductDetailsImageResponse[]=[]
  breadcrumbArr=[
    {name:"Home"}
    
  ]

  constructor(private productService:ProductService, private cartService:CartService, private toaster: ToastrService, private router: Router, private route: ActivatedRoute){
  }

  getDetailsProduct(id:string){
    const productId=parseInt(id)
    this.productService.getProductDetailsById(productId).subscribe({
      next:(response:ProductDetailsResponse)=>{
        //console.log(response)
        this.productDetails= response  
        //console.log(this.productDetails)  
        this.breadcrumbArr.push({"name":this.productDetails.name})
      },
      complete:()=>{},
      error:(error:any)=>{

      }
    })
  }

  getProductDetailsImageList(id:string){
    const productId=parseInt(id)
    this.productService.getProductDetailsImageByProductId(productId).subscribe({
      next:(response:ProductDetailsImageResponse[])=>{
        this.productDetailsImageList=response
        //console.log(this.productDetailsImageList)
        this.productDetailsImageList.forEach((p: ProductDetailsImageResponse)=>{
          p.imgUrl=`${env.apiBaseUrl}/products/images/${p.image_url}`

        })
        //console.log(this.productDetailsImageList)
      },
      complete:()=>{},
      error:(error:any)=>{

      }
    })
  }
  viewThumbnailImage(i:number){
    this.currentImgIndex=i

  }
  increaseQuantity():void{
    this.quantity++;
  }
  decreaseQuantity():void{
    if(this.quantity>1){
      this.quantity--;
    }
  }
  buyNow():void{
    
  }
  addToCart():void{
    if(this.productDetails){
      this.cartService.addToCart(this.productDetails.id,this.quantity)
      this.toaster.success("Add to cart successfully", "Success", {closeButton:true, positionClass:'toast-top-center'})
    }else{
      this.toaster.error("Cannot add product to cart", "Error", {closeButton:true, positionClass:'toast-top-center'})
    }
  }
  checkoutNavigate():void{
    if(this.cartService.getCart().size===0){
      this.toaster.error("Choose an item and add to cart", "Error", {closeButton:true, positionClass:'toast-top-center'})
      return ;
    }
    this.router.navigate(['/orders'])
  }

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
    });
    this.getDetailsProduct(this.productId!)
    this.getProductDetailsImageList(this.productId!)
   
  }
}
