
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

  constructor(
    private productService: ProductService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private afs: AngularFirestore
  ) {}
  ngOnInit() {
    const cartItems = this.productService.cart.value;
    this.productService
      .getProducts()
      .pipe(take(1))
      .subscribe((allProducts) => {
        this.products = allProducts
          .filter((p) => cartItems[p.id])
          .map((product) => {
            return { ...product, count: cartItems[product.id] };
          });
      });
  }

  async checkout() {
    let data = localStorage.getItem('userId');
    if (localStorage.getItem('user') !== null) {
      for (let index = 0; index < this.products.length; index++) {
        const fbDocument = await this.afs.collection('orders').add({
          productId: this.products[index].id,
          image: this.products[index].image,
          title:this.products[index].title,
          price:this.products[index].price,
          uid: data,
        });
      }
      this.productService.checkoutCart();
      const alert = await this.alertCtrl.create({
        header: 'Success',
        message: 'Thanks for your order',
        buttons: ['Continue shopping'],
      });
      await alert.present();
      this.modalCtrl.dismiss();
    } else {
      this.modalCtrl.dismiss();
      this.router.navigate(['login']);
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
