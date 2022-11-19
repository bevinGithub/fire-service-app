import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {
  reviews: any;
  technicianID: any;
  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.technicianID = this.activatedRoute.snapshot.paramMap.get('technicianID');
    console.log(this.technicianID);
    this.http.get(this.url + 'get-ratings.php?technicianID=' + this.technicianID).subscribe((ratings: any) => {
      console.log(ratings);
      this.reviews = ratings;
    });
   }

  ngOnInit() {
  }

}
