import {Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import {  NavigationExtras, Router } from '@angular/router';
import { first, take } from 'rxjs/operators';
import { JoyrideService } from 'ngx-joyride';
import { JoyrideOptions } from 'ngx-joyride/lib/models/joyride-options.class';
import { AlertController, ModalController } from '@ionic/angular';
import { AngularFirestore,  } from '@angular/fire/compat/firestore';
import { SampleDataService } from 'src/app/services/sample-data.service';
import { CartModalPage } from '../cart-modal/cart-modal.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('categories') categoryDiv: ElementRef;
  @ViewChild('myfab', { read: ElementRef }) carBtn: ElementRef;
  @ViewChild('viewAll', { read: ElementRef }) view: ElementRef;
  @ViewChild('seed', { read: ElementRef }) seedDiv: ElementRef;

  cart = {};
  cartLen = [];
  products;
  data;
  allProducts;
  mostBoughtItems = [];
  public foodList: any[];
  public foodListBackup: any[];

  constructor(
    private productService: ProductService,
    private router: Router,
    private joyRide: JoyrideService,
    private alert: AlertController,
    private afs: AngularFirestore,
    private sampleData: SampleDataService,
    private modalCtrl:ModalController
  ) {
    this.data = this.sampleData.getSampleData();
  }

  async ngOnInit() {
    const stored = await localStorage.getItem('key');
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
    if (stored == null) {
      setTimeout(() => {
        this.startTour();
      }, 2000);
    }
    this.initializeItems();
  }

  route(data) {
    const extra: NavigationExtras = {
      state: {
        category: data,
      },
    };
    this.router.navigate(['products'], extra);
  }

  startTour() {
    const options: JoyrideOptions = {
      steps: [
        'step1@home',
        'step2@home',
        'step3@home',
        'step4@home',
        'step5@products',
        'step6@products',
        'step7@products',
        'step8@products',
        'step9@view-product',
        'step10@login',
        'step11@login',
        'step12@home',
        'step13@home',
      ],
      showCounter: false,
      waitingTime: 500,
    };
    this.joyRide.startTour(options);
  }
  setContent = [
    'Your Navigation bar',
    'List of categories',
    'Click on the image to see particular products',
    'Click on View all for all related products',
    'click on the search button to search for a product',
    'click on the ? to get the tour again',
  ];

  scrollView(data) {
    if (data == 'viewAll') {
      this.view.nativeElement.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      });
    }
    if (data == 'category') {
      this.categoryDiv.nativeElement.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      });
    }
    if (data == 'seed') {
      this.seedDiv.nativeElement.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      });
    }
  }

  async finishTour() {
    const alertModal = await this.alert.create({
      header: 'You got it',
      message: 'Enjoy using our app!',
      buttons: [
        {
          text: 'Ok',
          handler: async () => {
            await localStorage.setItem('key', 'done');
          },
        },
      ],
    });
    await alertModal.present();
  }

  openSearch() {
    this.router.navigate(['search']);
  }

  openProductPage(item) {
    const navExtra: NavigationExtras = {
      state: {
        product: item,
      },
    };
    this.router.navigate(['view-product'], navExtra);
  }

  async initializeItems(): Promise<any> {
    const productsList = await this.afs
      .collection('products')
      .valueChanges()
      .pipe(first())
      .toPromise();
    this.allProducts = productsList;
    setTimeout(async () => {
      await this.getMostBoughtProduct();
    }, 2000);
    console.log(productsList);
    return productsList;
  }

  async getMostBoughtProduct() {
    let len = this.allProducts.length;
    for (let index = 0; index < len; index++) {
      const element = this.allProducts[index];
      if (element.purchases>=2) {
        this.mostBoughtItems.push(element);
      }
    }
  }
  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CartModalPage,
    });
    await modal.present();
  }

}
