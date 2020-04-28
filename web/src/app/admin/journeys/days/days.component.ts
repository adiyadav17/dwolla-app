import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";
import { JourneysService } from '../../../_services/journeys.service';
import { DaysService } from '../../../_services/days.service';
import { ExpertService } from '../../../_services/expert.service';
@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.css']
})
export class DaysComponent implements OnInit {
  cid;
  dayid;
  tourdata;
  daylist;
  constructor(
    private journeysService: JourneysService, 
    private expertService: ExpertService,
    private daysService: DaysService,
    private location: Location,
    private router: Router, 
    private route: ActivatedRoute, ) {
      this.route.params.forEach((urlParams) => {
        this.cid = urlParams['tourid'];
      });
  }

  ngOnInit() {
    if(this.cid){
      this.getJourney();
    }
    this.getDayslist();
  }

  getJourney() {
    this.journeysService.getJourney(this.cid).subscribe(
      res => {
        this.tourdata = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  getDayslist(){
    this.daysService.getbyJourney(this.cid).subscribe(
      res => {
        this.daylist = res;
        this.daylist.sort(function (a, b) {
          return a.day - b.day
        })
      },
      err => {
        console.log(err);
      }
    );
  }

  addDays(){
      this.router.navigate(['/admin/adddays', {tourid: this.cid}]);
  }

  editDay(){
      this.router.navigate(['/admin/adddays', {id: this.dayid, tourid: this.cid}]);
  }

  deleteDay(){
     this.daysService.delete(this.dayid).subscribe(
      res => {
        this.getDayslist();
      },
      err => { 
        console.log(err);
      }
    )
  }

  goBack(): void {
    this.location.back();
  }

}
