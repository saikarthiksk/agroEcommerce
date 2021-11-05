import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Animation, AnimationController, ModalController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Products } from 'src/app/models/products';
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
}
