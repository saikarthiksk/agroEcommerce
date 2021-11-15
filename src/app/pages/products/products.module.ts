import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './products-routing.module';

import { ProductsPage } from './products.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { JoyrideModule } from 'ngx-joyride';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule,
    ComponentsModule,
    JoyrideModule.forChild()

  ],
  declarations: [ProductsPage]
})
export class ProductsPageModule {}
