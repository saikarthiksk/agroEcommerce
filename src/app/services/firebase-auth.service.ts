import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  isLoggedIn = false
  constructor(public firebaseAuth : AngularFireAuth,
    private afs: AngularFirestore) {
   }
  async signin(email: string, password : string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then( res=>{
      console.log(res.user.uid);
      const uid = res.user.uid;
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
      localStorage.setItem('userId',(res.user.uid))
    })
  }
  async signup(email: string, password : string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true
      const uid = res.user.uid;
      localStorage.setItem('user',JSON.stringify(res.user))
      localStorage.setItem('userId',(uid))
      return this.afs.doc(
        `users/${uid}`
      ).set({
        uid,
        email: res.user.email,
      });
    })
  }
  logout(){
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
  }

}
