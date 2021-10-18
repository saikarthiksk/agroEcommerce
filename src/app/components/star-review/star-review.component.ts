import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.scss'],
})
export class StarReviewComponent implements OnInit {
  stars;
  constructor(private afs: AngularFirestore) {
   }

  ngOnInit() {
  }

   check(event,i) {
    event.stopPropagation();

       this.stars = i ;
  }
 async onSubmit(event){
    event.stopPropagation();

    const fbDocument = await this.afs.collection('ratings').add({
      productId:'7',
      star:this.stars
    });
  }
}
