import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../../../Services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryResponse } from '../../responses/CategoryResponse';
import { FileHandle } from '../../dto/FileHandle';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-new',
  standalone: true,
  imports: [SidebarComponent,AdminHeaderComponent, CommonModule,FormsModule],
  templateUrl: './product-new.component.html',
  styleUrl: './product-new.component.css'
})
export class ProductNewComponent {
  allCategories:CategoryResponse[]=[]
  imageSrcArray: string[] = [];
  imageSrc?: string | ArrayBuffer |null;
  files:File[]=[]
  @ViewChild("newProductForm") newProductForm=NgForm
  name:string=""
  price:number=0
  description:string=""
  selectedCategory:number|null=1
  fileHandles:any[]=[]



  constructor(private productService:ProductService, private toaster: ToastrService, private router: Router, private route: ActivatedRoute, private sanitizer:DomSanitizer){
  }

  

  createProduct(){
    const newProduct={
      price:this.price,
      thumbnail:'',
      description:this.description,
      name:this.name,
      category_id: this.selectedCategory
    }
    console.log(newProduct, this.fileHandles)
   this.productService.createProduct(newProduct).subscribe({
    next:(respone:any)=>{
      //console.log(respone)
      const {id}=respone

      this.productService.addImagesOfProduct(id, this.files).subscribe({
        next:(responeImage:any)=>{
          //debugger
          console.log(responeImage)
          
          this.toaster.success("Product created successfully", "Success", {closeButton:true, positionClass:'toast-top-center'})
          this.router.navigate([`/products/${id}`])
        },
        complete:()=>{
  
          
        },
        error:(error:any)=>{
          //debugger
          console.log(error)
          this.toaster.error("error", "Error", {closeButton:true, positionClass:'toast-top-center'})
        }
      })
     

     //this.router.navigate([`/admin/products/images/${id}`])
    },
    complete:()=>{

      
    },
    error:(error:any)=>{
      console.log(error)
      this.toaster.error("Error Created Product", "Error", {closeButton:true, positionClass:'toast-top-center'})
    }
   })
  }

  onFileChangeImgCarousel(event: any) {
    const input = event.target as HTMLInputElement;
    if (event.target.files.length > 0) {
      this.files = Array.from(event.target.files);
    }
    
    // Array.from(this.files).forEach(item => {
    //   const fileHandle:FileHandle={
    //     file:item,
    //     url:this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(item))
    //   }
    //   this.fileHandles.push(fileHandle)
    // })
    if (input.files) {
      this.imageSrcArray = []; 
      let index=1;// Clear existing images
      Array.from(input.files).forEach(file => {
        
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            this.imageSrcArray.push(e.target.result as string);
            if(index==1){
              this.imageSrc=e.target.result as string
            }
            
          }
        };
        index++;
        reader.readAsDataURL(file);
      });
    }
  }

  getAllCategories(){
    this.productService.getAllCategories().subscribe({
      next:(response:CategoryResponse[])=>{
        this.allCategories=response
        console.log(this.allCategories)
      },
      complete:()=>{},
      error:(error:any)=>{

      }
    })
  }
  
  ngOnInit(){
    this.getAllCategories()
  }
}
