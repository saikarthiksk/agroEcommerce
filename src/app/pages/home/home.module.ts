import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CartModalPageModule } from '../cart-modal/cart-modal.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { JoyrideModule } from 'ngx-joyride';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    CartModalPageModule,
    ComponentsModule,
    JoyrideModule.forChild()
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
