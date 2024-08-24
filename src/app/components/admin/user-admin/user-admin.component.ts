import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { PaginationComponent } from '../../../layout/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../../../Services/user/user.service';
import { UserResponse } from '../../responses/UserResponse';

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [SidebarComponent,AdminHeaderComponent,CommonModule, PaginationComponent, FormsModule],
  templateUrl: './user-admin.component.html',
  styleUrl: './user-admin.component.css'
})
export class UserAdminComponent {
  userList:any[]=[]
  keyword:string =""
  page:number=0
  limit:number=10
  totalElements:number=0;
  totalPages:number=0;
  constructor(public dialog: MatDialog, private toaster: ToastrService, private router : Router, private userService:UserService){

  }
  getTotalPages(){
    return Math.floor(this.totalElements/this.limit)
  }
  viewUser(id:number){
    this.router.navigate([`/admin/users/${id}`])
  }
  getAllUsers(page:number, limit:number, keyword:string){
    this.userService.getAllUsersByAdmin(keyword,page, limit).subscribe({
      next:(response:any)=>{
        const {users, totalElements, totalPages}=response;
        //console.log(response)
        users.forEach((user:UserResponse) => {
          
          
          if(user.is_active==1){
            user.active="YES"
          }else{
            user.active="NO"
          }
        });
        
        
        this.userList=users;
        this.totalPages=totalPages;
        this.totalElements=totalElements
      },
      complete:()=>{

      },
      error:(error:any)=>{

      }

    })

  }
  onEnter(event:any) {
    event.preventDefault(); 
    this.searchUser(); 
  }
  searchUser(){
    // console.log(this.keyword)
    // console.log(this.getTotalPages())
    this.getAllUsers(this.page,this.limit,this.keyword)
  }
  clearSearch() {
    this.keyword= '';
    this.getAllUsers(this.page,this.limit,this.keyword)
  }
  onPageChange(pageIndex:number){
   
    this.page=pageIndex;
    this.getAllUsers(this.page,this.limit,this.keyword)
    
  }
  ngOnInit(){
   
    this.getTotalPages()
    this.getAllUsers(this.page,this.limit,this.keyword)
  }
}
