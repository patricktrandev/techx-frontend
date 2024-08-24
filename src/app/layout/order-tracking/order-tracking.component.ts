import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.css'
})
export class OrderTrackingComponent {

  @Input() count="";
  

  orders=[
    {name:"Order Checkout", checked:false},
    {name:"Order Confirmed", checked:false},
    {name:"Shipped", checked:false},
    {name:"Delivered", checked:false},
  ]

  getClassCompleted(count:string){
    let countNum=parseInt(count);
    console.log(countNum)
    for(let i =0; i<this.orders.length; i++){
        if(i>countNum-1){
          this.orders[i].checked=false
        }else{
          this.orders[i].checked=true
        }      
    }
  }
  ngOnInit(){
    this.getClassCompleted(this.count);
  }
}
