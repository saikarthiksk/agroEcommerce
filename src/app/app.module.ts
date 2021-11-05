import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from "src/environments/environment";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JoyrideModule } from 'ngx-joyride';

const firebaseConfig = [
  AngularFireAuthModule,
  AngularFireModule.initializeApp(environment.firebase), // Your config
];
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    firebaseConfig,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    JoyrideModule.forRoot(),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
