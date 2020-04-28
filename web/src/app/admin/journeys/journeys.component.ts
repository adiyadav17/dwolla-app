import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import { JourneysService } from '../../_services/journeys.service';
@Component({
  selector: 'app-journeys',
  templateUrl: './journeys.component.html',
  styleUrls: ['./journeys.component.css']
})
export class JourneysComponent implements OnInit {
  showLoader: boolean;
  tourlist: any;
  tourid;
  constructor(private router: Router, private journeysService: JourneysService,
    private location: Location) {
    this.showLoader = true;
  }

  ngOnInit() {
    this.getlist();
  }

  getlist() {
    this.journeysService.getJourneylist().subscribe(
      res => {
        this.tourlist = res;
        this.tourlist.sort(function (a, b) {
          return a.order - b.order;
        });
        this.showLoader = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  addJourney() {
    this.router.navigate(['/admin/addjourneys']);
  }

  editJourney() {
    this.router.navigate(['/admin/addjourneys', {tourid: this.tourid}]);
  }

  delete() {
    // console.log(this.userId);
    this.journeysService.deleteJourney(this.tourid).subscribe(
      res => {
        this.getlist();
      },
      err => {
        console.log(err);
      }
    );
  }

  viewTourdays() {
    this.router.navigate(['/admin/days', {tourid: this.tourid}]);
  }
}
