import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Animation, AnimationController, LoadingController, ModalController } from '@ionic/angular';
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
    private modalCtrl: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private loadingController:LoadingController
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.category =this.router.getCurrentNavigation().extras.state.category;
      }
    });
  }

  ngOnInit() {
    if(this.category!=undefined){
      this.productService.getProducts().subscribe((res) => {
        this.products = res;
      });
    }
    // Listen to Cart changes
    this.productService.cart.subscribe((value) => {
      this.cart = value;
    });
    if (this.category == undefined) {
      this.products = [
        {
          id: 1,
          category: 'Seeds',
          price: 200,
          image: 'assets/img/seeds/peas.jpg',
          title: 'Peas',
        },
        {
          id: 1,
          category: 'Seeds',
          price: 200,
          image: 'assets/img/seeds/tomato.jpg',
          title: 'tomato',
        },
      ];
    }
    this.presentLoading();
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

  openProductPage(item) {
    const navExtra: NavigationExtras = {
      state: {
        product: item,
      },
    };
    this.router.navigate(['view-product'], navExtra);
  }

  async filterList(evt) {
    const searchTerm = evt.srcElement.value;
    let data;
    this.productService.getProducts().subscribe((res) => {
      data = res;
      data = data.filter((data) => data.category == this.category);
      if (!searchTerm) {
        this.products = data;
      } else {
        this.products = data.filter((product) => {
          if (product.title && searchTerm) {
            return (
              product.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
            );
          }
        });
      }
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
