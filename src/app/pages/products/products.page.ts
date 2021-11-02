import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Animation, AnimationController, ModalController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products;
  @ViewChild('myfab', { read: ElementRef }) carBtn: ElementRef;
  cart = {};
  cartAnimation: Animation;
  category;
  constructor(
    private productService: ProductService,
    private animationCtrl: AnimationController,
    private modalCtrl: ModalController,
    private afs: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.category = this.router.getCurrentNavigation().extras.state.category;
      }
    });
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
    console.log(this.products);
    // Listen to Cart changes
    this.productService.cart.subscribe((value) => {
      this.cart = value;
    });
  }

  ngAfterViewInit() {
    // Setup an animation that we can reuse
    // this.cartAnimation = this.animationCtrl.create('cart-animation');
    // this.cartAnimation
    // .addElement(this.carBtn.nativeElement)
    // .keyframes([
    //   { offset: 0, transform: 'scale(1)' },
    //   { offset: 0.5, transform: 'scale(1.2)' },
    //   { offset: 0.8, transform: 'scale(0.9)' },
    //   { offset: 1, transform: 'scale(1)' }
    // ])
    // .duration(300)
    // .easing('ease-out');
  }

  addToCart(event, product) {
    event.stopPropagation();
    this.productService.addToCart(product.id);
    // this.cartAnimation.play();
  }

  removeFromCart(event, product) {
    event.stopPropagation();
    this.productService.removeFromCart(product.id);
    // this.cartAnimation.play();
  }

  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CartModalPage,
    });
    await modal.present();
  }

  openProductPage(item){
    const navExtra:NavigationExtras={
      state:{
        product:item
      }
    }
    this.router.navigate(['view-product'],navExtra);
  }
}
