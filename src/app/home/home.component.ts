import { Token } from '@angular/compiler';
import { CategoryResponse } from './../components/responses/CategoryResponse';
import { ProductResponse } from './../components/responses/ProductResponse';
import { ProductService } from './../Services/product/product.service';
import { Component, Input } from '@angular/core';
import { LayoutModule } from '../layout/layout.module';
import { FooterComponent } from '../layout/footer/footer.component';
import { HeaderComponent } from '../layout/header/header.component';
import { CommonModule } from '@angular/common';
import { env } from '../components/enviroments/environment';
import { PaginationComponent } from '../layout/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserResponse } from '../components/responses/UserResponse';
import { UserService } from '../Services/user/user.service';
import { TokenService } from '../Services/user/token.service';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LayoutModule,
    FooterComponent,
    HeaderComponent,
    CommonModule,
    PaginationComponent,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: ProductResponse[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 12;
  totalPages: number = 0;
  totalElements: number = 0;
  pages: number[] = [];
  visiblePages: number[] = [];
  img: string = '';
  allCategories: CategoryResponse[] = [];
  selectedCategoryId: number = 0;
  keyword: string = '';
  userResponse?: UserResponse;

  constructor(
    private productService: ProductService,
    private toaster: ToastrService,
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService
  ) {}
  getTotalPages() {
    return Math.floor(this.totalElements / this.itemsPerPage);
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
          console.log(products);
          products.forEach((product: ProductResponse) => {
            product.url = `${env.apiBaseUrl}/products/images/${product.thumbnail}`;
            if (product.url.includes('null')) {
              product.url =
                'https://res.cloudinary.com/dctb1eocj/image/upload/v1723453744/avatar/logo_q8zea4.png';
            }
          });

          this.products = products;
          this.totalPages = totalPages;
          this.totalElements = totalElements;
        },
        complete: () => {},
        error: (error: any) => {},
      });
  }
  clearSearch() {
    this.keyword = '';
    this.getAllProducts(
      this.currentPage,
      this.itemsPerPage,
      this.selectedCategoryId,
      this.keyword
    );
  }
  getAllCategories() {
    this.productService.getAllCategories().subscribe({
      next: (response: CategoryResponse[]) => {
        this.allCategories = response;
        //console.log(this.allCategories)
      },
      complete: () => {},
      error: (error: any) => {},
    });
  }
  onPageChange(pageIndex: number) {
    this.currentPage = pageIndex;
    //console.log(this.currentPage)
    //console.log("total pages",this.totalPages)

    this.getAllProducts(
      this.currentPage,
      this.itemsPerPage,
      this.selectedCategoryId,
      this.keyword
    );
  }
  searchProducts() {
    console.log(this.selectedCategoryId);
    console.log(this.keyword);
    console.log(this.getTotalPages());
    this.getAllProducts(
      this.currentPage,
      this.itemsPerPage,
      this.selectedCategoryId,
      this.keyword
    );
  }

  loadToken() {
    const token = this.tokenService.getToken();
    return token;
  }

  onEnter(event: any) {
    event.preventDefault();
    this.searchProducts();
  }
  productNavigate(id: number) {
    this.router.navigate([`/products/${id}`]);
  }
  cartNavigate() {
    this.router.navigate(['/orders']);
  }
  ngOnInit() {
    //this.loadUser()
    this.getAllProducts(
      this.currentPage,
      this.itemsPerPage,
      this.selectedCategoryId,
      this.keyword
    );
    this.getAllCategories();
    this.getTotalPages();
  }
}
