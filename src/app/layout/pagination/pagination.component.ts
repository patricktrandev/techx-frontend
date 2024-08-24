import { ProductService } from './../../Services/product/product.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductResponse } from '../../components/responses/ProductResponse';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
@Input() pagesArr:number=0;
@Input() currentPage=0;
@Output() pageClick=new EventEmitter();
pages=Array.from({length:5})

constructor(private productService:ProductService){}
onClickPageNumber(pageIndex:number){
  this.currentPage=pageIndex
  //console.log(this.pages.length)
  this.pages=Array.from({length:this.pagesArr+1})
  this.pageClick.emit(this.currentPage)
}

getPage(index:number){
  
  return Math.abs(this.currentPage-index)<4
}

}
