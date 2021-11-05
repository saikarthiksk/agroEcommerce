import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  showResults=false;
  public productsList: any[];
  public productsListBackup: any[];
  constructor(
    private afs:AngularFirestore
  ) { }

  async ngOnInit() {
    this.productsList = await this.initializeItems();
  }

  async initializeItems(): Promise<any> {
    const productsList = await this.afs.collection('products')
      .valueChanges().pipe(first()).toPromise();
    this.productsListBackup = productsList;
    return productsList;
  }
  async filterList(evt) {
  this.showResults=true;

    this.productsList = await this.initializeItems();
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }
    else{
      this.productsList = this.productsList.filter(product => {
        if (product.title && searchTerm) {
          return (product.title.toLowerCase().indexOf(searchTerm.toLowerCase()) >-1);
        }
      });
    }

  }

}
