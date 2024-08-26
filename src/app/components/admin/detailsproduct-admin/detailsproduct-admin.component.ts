import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../../../layout/header/header.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../Services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsImageResponse } from '../../responses/ProductDetailsImageResponse';
import { env } from '../../enviroments/environment';
import { ProductDetailsResponse } from '../../responses/ProductDetailsResponse';
import { CategoryResponse } from '../../responses/CategoryResponse';

@Component({
  selector: 'app-detailsproduct-admin',
  standalone: true,
  imports: [SidebarComponent, AdminHeaderComponent, CommonModule, FormsModule],
  templateUrl: './detailsproduct-admin.component.html',
  styleUrl: './detailsproduct-admin.component.css',
})
export class DetailsproductAdminComponent {
  name: string | null = '';
  price: number | null = 0;
  description: string | null = '';
  deactivated: number | null = 0;
  category: number | null = 0;

  currentImgIndex: number = 0;
  productDetails?: ProductDetailsResponse;
  productId: string | null = '';
  productDetailsImageList: ProductDetailsImageResponse[] = [];
  allCategories: CategoryResponse[] = [];

  deactivate = [
    { label: 'YES', id: 1 },
    { label: 'NO', id: 2 },
  ];

  constructor(
    private productService: ProductService,
    private toaster: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  changeName() {}
  changePrice() {}
  changeDescription() {}
  changeDeactivated() {}
  changeCategory() {}

  getProductDetailsImageList(id: string) {
    const productId = parseInt(id);
    this.productService.getProductDetailsImageByProductId(productId).subscribe({
      next: (response: ProductDetailsImageResponse[]) => {
        this.productDetailsImageList = response;
        //console.log(this.productDetailsImageList)
        this.productDetailsImageList.forEach(
          (p: ProductDetailsImageResponse) => {
            p.imgUrl = `${env.apiBaseUrl}/products/images/${p.image_url}`;
          }
        );
        //console.log(this.productDetailsImageList)
      },
      complete: () => {},
      error: (error: any) => {},
    });
  }
  getDetailsProduct(id: string) {
    const productId = parseInt(id);
    this.productService.getProductDetailsById(productId).subscribe({
      next: (response: ProductDetailsResponse) => {
        //console.log(response)
        this.productDetails = response;
        console.log(this.productDetails);
        this.name = this.productDetails?.name!;
        this.price = this.productDetails?.price!;
        this.description = this.productDetails?.description!;
        this.deactivated = this.productDetails?.isActive!;
        this.category = this.productDetails.category.id!;
      },
      complete: () => {},
      error: (error: any) => {},
    });
  }
  viewThumbnailImage(i: number) {
    this.currentImgIndex = i;
  }
  getAllCategories() {
    this.productService.getAllCategories().subscribe({
      next: (response: CategoryResponse[]) => {
        this.allCategories = response;
        console.log(this.allCategories);
      },
      complete: () => {},
      error: (error: any) => {},
    });
  }
  areEqual(a: number, b: number, epsilon = 1e-10) {
    return Math.abs(a - b) < epsilon;
  }
  updateProduct(id: number) {
    const productUpdated = {
      name: this.name,
      price: this.price,
      thumbnail: '',
      description: this.description,
      category_id: this.category,
    };
    const val1 =
      productUpdated.name! === this.productDetails?.name! &&
      productUpdated.description! === this.productDetails?.description!;
    const val3 = productUpdated.price === this.productDetails?.price!;
    const val4 =
      productUpdated.category_id === this.productDetails?.category.id!;

    if (val1 && val3 && val4) {
      this.toaster.error('Invalid data updated', 'Error', {
        closeButton: true,
        positionClass: 'toast-top-center',
      });
      return;
    }
    console.log(productUpdated);
    this.productService
      .updateProductDetailsByAdmin(id, productUpdated)
      .subscribe({
        next: (response: ProductDetailsResponse) => {
          //debugger
          console.log(response);
          this.toaster.success('Updated Product Successfully', 'Success', {
            closeButton: true,
            positionClass: 'toast-top-center',
          });
          this.router.navigate(['/admin/products']);
        },
        complete: () => {},
        error: (error: any) => {
          console.log(error);
          //debugger
          this.toaster.error(error.error.message, 'Error', {
            closeButton: true,
            positionClass: 'toast-top-center',
          });
        },
      });
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
    });
    this.getDetailsProduct(this.productId!);
    this.getProductDetailsImageList(this.productId!);
    this.getAllCategories();
  }
}
