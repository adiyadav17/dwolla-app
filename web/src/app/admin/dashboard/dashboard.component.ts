import { Component, OnInit } from '@angular/core';
import { JourneysService } from '../../_services/journeys.service';
import { HotelsService } from '../../_services/hotels.service';
import { ExpertService } from '../../_services/expert.service';
import { UserService } from '../../_services/user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showLoader: boolean;
  tourlist;
  hotellist;
  expertlist;
  userlist;
  constructor(
    private journeysService: JourneysService, 
    private hotelsService: HotelsService, 
    private expertService: ExpertService, 
    private userService: UserService, 
    ){ 
      this.showLoader = true;
  }
  ngOnInit() {
    this.getDashData();
  }

  getDashData(){
      this.getJourney();
      this.getHotel();
      this.getExpert();
      this.getUser();
      this.showLoader = false;
  }

 

  getHotel(){
    this.hotelsService.getAllHotels().subscribe(
      res => {
        this.hotellist = res;
      },
      err => { 
        console.log(err);
      }
    );
  }

  getExpert(){
    this.expertService.getAllExperts().subscribe(
      res => {
        this.expertlist = res;
      },
      err => { 
        console.log(err);
      }
    );
  }

  getUser(){
    this.userService.getUserlist().subscribe(
      res => {
        this.userlist = res;
      },
      err => { 
        console.log(err);
      }
    );
  }

  getJourney(){
    this.journeysService.getJourneylist().subscribe(
      res => {
        this.tourlist = res;
      },
      err => { 
        console.log(err);
      }
    );
  }

}
