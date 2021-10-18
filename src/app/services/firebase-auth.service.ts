import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  isLoggedIn = false
  constructor(public firebaseAuth : AngularFireAuth) {
   }
  async signin(email: string, password : string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then( res=>{
      console.log(res.user.uid);
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
      localStorage.setItem('userId',JSON.stringify(res.user.uid))
    })
  }
  async signup(email: string, password : string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
    })
  }
  logout(){
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
  }

}
