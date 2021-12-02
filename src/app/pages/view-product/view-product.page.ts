import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Products } from 'src/app/models/products';
import { ProductService } from 'src/app/services/product.service';
import { CartModalPage } from '../cart-modal/cart-modal.page';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})

export class ViewProductPage implements OnInit {
  cart = {};
  product:Products;
  ratings;
  userOrders;
  userCanRate=false;
  constructor(private router:Router,
    private route:ActivatedRoute,
    private productService:ProductService,
    private modalCtrl: ModalController,
    ) {
      this.route.queryParams.subscribe((params) => {
      if(this.router.getCurrentNavigation().extras.state.product){
        this.product=this.router.getCurrentNavigation().extras.state.product;
      }
    });
   }

   ionViewWillEnter(){
    this.userOrders=this.productService.getOrders().subscribe((data)=>{
      this.userOrders=data;
      let len=this.userOrders.length;
      for (let index = 0; index <len; index++) {
        const element = this.userOrders[index];
        if(this.product.id==element.productId){
          this.userCanRate=true;
        }
      }
    })
   }
  ngOnInit() {
    this.ratings = this.productService.getRatings();
    this.productService.cart.subscribe((value) => {
      this.cart = value;
    });
    if(this.product==undefined){
      this.product={
        id:1,
        category:'Seeds',
        price:200,
        image:'assets/img/seeds/peas.jpg',
        title:'Peas'
      }
    }
  }

  addToCart(event, product) {
    event.stopPropagation();
    this.productService.addToCart(product.id);
  }

  removeFromCart(event, product) {
    event.stopPropagation();
    this.productService.removeFromCart(product.id);
  }

  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CartModalPage,
    });
    await modal.present();
  }


}
