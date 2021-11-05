
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ProductService } from '../../services/product.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
  products;
  cart={};
  savedProducts=[];
  totalPrice=0;
  constructor(
    private productService: ProductService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private afs: AngularFirestore
  ) {}

   ngOnInit()
  {
    const cartItems = this.productService.cart.value;
    this.productService
      .getProducts()
      .pipe(take(1))
      .subscribe((allProducts) => {
        this.products = allProducts
          .filter((p) => cartItems[p.id])
          .map((product) => {
            this.totalPrice=this.totalPrice+(product.price*cartItems[product.id]);
            return { ...product, count: cartItems[product.id] };
          });
      });
      console.log(this.totalPrice);
  }


   calculatePrice() {
    for (let index = 0; index < this.savedProducts.length; index++) {
      this.totalPrice += this.savedProducts[index].price;
    }
  }

  async checkout() {
    let data = localStorage.getItem('userId');
    if (localStorage.getItem('user') !== null) {
      this.modalCtrl.dismiss();
      this.router.navigate(['checkout']);
    } else {
      this.modalCtrl.dismiss();
      this.router.navigate(['login']);
    }
  }

  close() {
    this.modalCtrl.dismiss(null , 'cancel');
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
