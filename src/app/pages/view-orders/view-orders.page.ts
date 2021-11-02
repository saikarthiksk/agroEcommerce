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

  ngOnInit() {
    this.products = this.productService.getOrders();
    console.log(this.products);

  }

}
