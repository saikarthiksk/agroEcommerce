import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CartModalPage } from './pages/cart-modal/cart-modal.page';
import { FirebaseAuthService } from './services/firebase-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private auth:FirebaseAuthService,
    private modalCtrl:ModalController,
    private router:Router) {
    this.sideMenu();
  }
  navigate;

  async ngOnInit(){

  }
  sideMenu() {
    this.navigate = [
      {
        title: 'login',
        icon: 'log-in-outline',
      },
      {
        title: 'cart',
        icon: 'cart-outline',
      },
      {
        title: 'My orders',
        url: '/view-orders',
        icon: 'newspaper-outline',
      },
      {
        title: 'Logout',
        icon: 'log-out-outline',
      },
    ];
  }

 async  logout(page){
    if(page.title=='Logout'){
      this.auth.logout();
    }
    else if(page.title=='cart'){
      const modal = await this.modalCtrl.create({
        component: CartModalPage,
      });
      await modal.present();
    }
    else if(page.title=='login'){
      let data=localStorage.getItem('userId');
      if(data==null){
        this.router.navigate(['login']);
      }
    }
  }
}
