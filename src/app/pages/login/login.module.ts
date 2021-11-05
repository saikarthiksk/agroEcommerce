import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { HomePageModule } from '../home/home.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { JoyrideModule } from 'ngx-joyride';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    HomePageModule,
    ComponentsModule,
    JoyrideModule.forChild()

  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
