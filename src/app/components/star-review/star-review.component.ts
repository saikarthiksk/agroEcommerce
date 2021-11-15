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
    let username=await localStorage.getItem('username')
    event.stopPropagation();
    const fbDocument = await this.afs.collection('ratings').add({
      user:username,
      productId:this.id,
      review:this.review
    });
    this.review='';
  }
}
