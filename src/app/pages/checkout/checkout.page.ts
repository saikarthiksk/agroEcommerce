
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ProductService } from '../../services/product.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import firebase from '@firebase/app-compat';
const INCREMENT = firebase.firestore.FieldValue.increment(1);
const DECREMENT = firebase.firestore.FieldValue.increment(-1);
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  productsCollection: AngularFirestoreCollection;
  paymentViaCard=false;
  products;
  cart={};
  postData={
    firstname:'',
    lastname:'',
    address:'',
    state:'',
    pincode:''
  }
  card={
    cardName:'',
    cardNumber:0,
    cvv:0,
    expiration:0
  }
  constructor(    private productService: ProductService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private afs: AngularFirestore) {
    this.productsCollection = this.afs.collection('products');
    }

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

  payment(){
  this.paymentViaCard=true;
  }

  cod(){
  this.paymentViaCard=false;
  }
  async checkout() {
    let data = localStorage.getItem('userId');
    if (localStorage.getItem('user') !== null) {
      let len=this.products.length
      for (let index = 0; index < len; index++) {
        const fbDocument = await this.afs.collection('orders').add({
          productId: this.products[index].id,
          image: this.products[index].image,
          title:this.products[index].title,
          price:this.products[index].price,
          uid: data
        });
        this.productsCollection.doc(this.products[index].id).update({
          purchases: INCREMENT
        });
      }
      this.productService.checkoutCart();
      const alert = await this.alertCtrl.create({
        header: 'Success',
        message: 'Thanks for your order',
        buttons: ['Continue shopping'],
      });
      await alert.present();
      this.router.navigate(['home']);
    } else {
      this.modalCtrl.dismiss();
      this.router.navigate(['login']);
    }
  }
}
