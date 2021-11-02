import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Animation, AnimationController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ProductService } from 'src/app/services/product.service';
import { NavigationExtras, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Products } from 'src/app/models/products';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  @ViewChild('myfab', { read: ElementRef }) carBtn: ElementRef;
  cart = {};
  cartLen=[];
  products;

  constructor(
    private productService: ProductService,
    private modalCtrl: ModalController,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.productService.cart.subscribe((value) => {
      this.cart = value;
    });
    const cartItems = this.productService.cart.value;
    this.productService
      .getProducts()
      .pipe(take(1))
      .subscribe((allProducts) => {
        this.cartLen = allProducts
          .filter((p) => cartItems[p.id])
          .map((product) => {
            return { ...product, count: cartItems[product.id] };
          });
      });
  }

  route(data) {
    const extra: NavigationExtras = {
      state: {
        category: data,
      },
    };
    this.router.navigate(['products'], extra);
  }
}
