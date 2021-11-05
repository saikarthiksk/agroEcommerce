import {Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import {  NavigationExtras, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { JoyrideService } from 'ngx-joyride';
import { JoyrideOptions } from 'ngx-joyride/lib/models/joyride-options.class';
import { AlertController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { AngularFirestore,  } from '@angular/fire/compat/firestore';
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
  searchTerm:string;
  public foodList: any[];
  public foodListBackup: any[];

  constructor(
    private productService: ProductService,
    private router: Router,
    private joyRide: JoyrideService,
    private alert:AlertController,
    private afs:AngularFirestore
  ) {}

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
      waitingTime:500
    };
    this.joyRide.startTour(options);
  }
  setContent = [
    'Your Navigation bar',
    'List of categories',
    'Click on the image to see particular products',
    'Click on View all for all related products',
    'click on the search button to search for a product',
    'click on the ? to get the tour again'
  ];

  scrollView(data) {
    if (data == 'viewAll') {
      this.view.nativeElement.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      });
    }
    if (data == 'category'){
      this.categoryDiv.nativeElement.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      });
    }
    if (data == 'seed'){
      this.seedDiv.nativeElement.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      });
    }
  }

  async finishTour(){
    const alertModal= await this.alert.create({
      header:'You got it',
      message:'Enjoy using our app!',
      buttons:[
        {
          text:'Ok',
          handler:async ()=>{
            await localStorage.setItem('key', 'done');
          }
        }
      ]
    })
    await alertModal.present();
  }

   openSearch() {
    this.router.navigate(['search']);
    }
}
