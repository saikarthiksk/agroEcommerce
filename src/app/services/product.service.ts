import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import firebase from '@firebase/app-compat';
const CART_STORAGE_KEY = 'MY_CART';
import { Storage } from '@capacitor/storage';
const INCREMENT = firebase.firestore.FieldValue.increment(1);
const DECREMENT = firebase.firestore.FieldValue.increment(-1);

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cart = new BehaviorSubject({});
  cartKey = null;
  productsCollection: AngularFirestoreCollection;
  ratings:AngularFirestoreCollection;
  orders:AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) {
    this.loadCart();
    this.productsCollection = this.afs.collection('products');
    this.ratings = this.afs.collection('ratings');
    this.orders = this.afs.collection('orders');
  }

  getProducts() {
    return this.productsCollection.valueChanges({ idField: 'id' });
  }

  async loadCart() {
    const result = await Storage.get({ key: CART_STORAGE_KEY });
    if (result.value) {
      this.cartKey = result.value;

      this.afs.collection('carts').doc(this.cartKey).valueChanges().subscribe((result: any) => {
        // Filter out our timestamp
        // delete result['lastUpdate'];

        this.cart.next(result || {});
      });

    } else {
      // Start a new cart
      const fbDocument = await this.afs.collection('carts').add({
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
      });
      this.cartKey = fbDocument.id;
      // Store the document ID locally
      await Storage.set({ key: CART_STORAGE_KEY, value: this.cartKey });

      // Subscribe to changes
      this.afs.collection('carts').doc(this.cartKey).valueChanges().subscribe((result: any) => {
        console.log('cart changed: ', result);
        this.cart.next(result || {});
      });
    }
  }

  addToCart(id) {
    // Update the FB cart
    this.afs.collection('carts').doc(this.cartKey).update({
      [id]: INCREMENT,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Update the stock value of the product
    this.productsCollection.doc(id).update({
      stock: DECREMENT
    });
  }

removeFromCart(id) {
  // Update the FB cart
  this.afs.collection('carts').doc(this.cartKey).update({
    [id]: DECREMENT,
    lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
  });

  // Update the stock value of the product
  this.productsCollection.doc(id).update({
    stock: INCREMENT
  });
}

async checkoutCart() {
  // Create an order


  // Clear old cart
  this.afs.collection('carts').doc(this.cartKey).set({
    lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
  });
 }

  getRatings(){
  return this.ratings.valueChanges({ idField: 'id' });
 }

  getOrders(){
  return this.orders.valueChanges({ idField: 'id' });
 }
}
