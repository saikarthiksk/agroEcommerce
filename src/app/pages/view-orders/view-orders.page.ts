import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.page.html',
  styleUrls: ['./view-orders.page.scss'],
})
export class ViewOrdersPage implements OnInit {

  constructor(private productService:ProductService) { }
  products;
  userId=localStorage.getItem('userId');
  data=false;
  async ngOnInit() {
     this.productService.getOrders().subscribe((res)=>{
      this.products=(res);
      let len=this.products.length;
      for (let index = 0; index < len; index++) {
        const element = this.products[index].uid;
        if(this.userId==element){
          this.data=true;
          break;
        }
      }
    });
  }

}
