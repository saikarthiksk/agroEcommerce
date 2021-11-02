import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.scss'],
})
export class StarReviewComponent implements OnInit {

  @Input('id')id;
  stars;
  review;
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
      productId:this.id,
      star:this.stars,
      review:this.review
    });
  }
}
