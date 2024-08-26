import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../layout/pagination/pagination.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../../Services/order/order.service';
import { ProductService } from '../../../Services/product/product.service';
import { Router } from '@angular/router';
import { env } from '../../enviroments/environment';
import { ProductResponse } from '../../responses/ProductResponse';
import { ConfirmDialogComponent } from '../../../layout/confirm-dialog/confirm-dialog.component';
import { CategoryResponse } from '../../responses/CategoryResponse';

@Component({
  selector: 'app-product-admin',
  standalone: true,
  imports: [
    SidebarComponent,
    AdminHeaderComponent,
    CommonModule,
    PaginationComponent,
    FormsModule,
  ],
  templateUrl: './product-admin.component.html',
  styleUrl: './product-admin.component.css',
})
export class ProductAdminComponent {
  selectedCategoryId: number = 0;
  keyword: string = '';
  page: number = 0;
  limit: number = 10;
  productList: ProductResponse[] = [];
  totalElements: number = 0;
  totalPages: number = 0;
  allCategories: CategoryResponse[] = [];
  constructor(
    public dialog: MatDialog,
    private orderService: OrderService,
    private toaster: ToastrService,
    private router: Router,
    private productService: ProductService
  ) {}
  getTotalPages() {
    return Math.floor(this.totalElements / this.limit);
  }
  searchProducts() {
    console.log(this.keyword);
    console.log(this.getTotalPages());
    this.getAllProducts(
      this.page,
      this.limit,
      this.selectedCategoryId,
      this.keyword
    );
  }
  clearSearch() {
    this.keyword = '';
    this.getAllProducts(
      this.page,
      this.limit,
      this.selectedCategoryId,
      this.keyword
    );
  }
  onPageChange(pageIndex: number) {
    this.page = pageIndex;
    //console.log(this.currentPage)
    //console.log("total pages",this.totalPages)

    this.getAllProducts(
      this.page,
      this.limit,
      this.selectedCategoryId,
      this.keyword
    );
  }
  getAllProducts(
    page: number,
    limit: number,
    categoryId: number,
    keyword: string
  ) {
    this.productService
      .getProducts(page, limit, categoryId, keyword)
      .subscribe({
        next: (response: any) => {
          const { products, totalElements, totalPages } = response;
          //console.log(products)
          products.forEach((product: ProductResponse) => {
            product.url = `${env.apiBaseUrl}/products/images/${product.thumbnail}`;
            if (product.url.includes('null')) {
              product.url =
                'https://res.cloudinary.com/dctb1eocj/image/upload/v1723453744/avatar/logo_q8zea4.png';
            }
            if (product.is_active == 0) {
              product.active = 'NO';
            } else {
              product.active = 'YES';
            }
          });

          this.productList = products;
          this.totalPages = totalPages;
          this.totalElements = totalElements;
        },
        complete: () => {},
        error: (error: any) => {},
      });
  }
  reloadPage() {
    window.location.reload();
  }

  openConfirmDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteItem(id);
      }
    });
  }

  deleteItem(id: number): void {
    this.productService.deleteProductDetailsByAdmin(id).subscribe({
      next: (response: any) => {
        //console.log(response)
        this.toaster.success(response, 'Success', {
          closeButton: true,
          positionClass: 'toast-top-center',
        });
        this.reloadPage();
      },
      complete: () => {},
      error: (error: any) => {
        console.log(error);
        this.toaster.error(error.error.message, 'Error', {
          closeButton: true,
          positionClass: 'toast-top-center',
        });
      },
    });
    console.log('Item deleted');
  }
  addProductNavigate() {
    this.router.navigate(['/admin/products/new']);
  }
  orderDetailsAdminNavigate(id: number) {
    this.router.navigate([`/admin/products/${id}`]);
  }
  ngOnInit() {
    this.getAllProducts(
      this.page,
      this.limit,
      this.selectedCategoryId,
      this.keyword
    );
    this.getTotalPages();
  }
}
