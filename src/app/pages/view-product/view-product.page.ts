import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/app/models/products';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})

export class ViewProductPage implements OnInit {
  cart = {};
  product:Products;
  ratings;
  constructor(private router:Router,
    private productService:ProductService) {
    if(this.router.getCurrentNavigation().extras.state.product){
      this.product=this.router.getCurrentNavigation().extras.state.product;
    }
    else{
      this.router.navigate(['products'])
    }
   }

  ngOnInit() {
    this.ratings = this.productService.getRatings();
    this.productService.cart.subscribe((value) => {
      this.cart = value;
    });
  }

  addToCart(event, product) {
    event.stopPropagation();
    this.productService.addToCart(product.id);
  }

  removeFromCart(event, product) {
    event.stopPropagation();
    this.productService.removeFromCart(product.id);
  }

}
