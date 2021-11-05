import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  createNewAcc=false;
  title = 'firebase-angular-auth';
  isSignedIn = false;
  email;
  password;
  username;
  constructor(
    private firebaseService: FirebaseAuthService,
    private auth: AngularFireAuth,
    private router: Router,
    private alert:AlertController
  ) {}
  ngOnInit() {
    if (localStorage.getItem('user') !== null) {
      let data = localStorage.getItem('userId');
      this.isSignedIn = true;
      this.router.navigate(['home']);
    } else
      this.isSignedIn = false;
  }

  async onSignup(email: string, password: string,username:string) {
    localStorage.setItem('username',(username))
    let data = localStorage.getItem('username');
    console.log(data);

    await this.firebaseService.signup(email, password);
    if (this.firebaseService.isLoggedIn)
    {
      this.isSignedIn = true;
    }
    this.router.navigate(['home']);
  }

  async onSignin(email: string, password: string) {
    await this.firebaseService.signin(email, password);
    if (this.firebaseService.isLoggedIn){
      this.isSignedIn = true;
    }
    this.router.navigate(['home']);
  }

  handleLogout() {
    this.isSignedIn = false;
  }
  openSignUpPAge(){
    this.createNewAcc=true;
  }
}
