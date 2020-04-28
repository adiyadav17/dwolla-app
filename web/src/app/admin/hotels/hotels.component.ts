import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { Location } from '@angular/common';
import { HotelsService } from '../../_services/hotels.service';
@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  showLoader: boolean;
  hotellist:any;
  hotelId: any;
  constructor(private router: Router, private hotelsService: HotelsService, 
    private location: Location,) { 
    this.showLoader = true;
  }

  ngOnInit() {
    this.getlist();
  }
  addexpert(){
    this.router.navigate(['/admin/addhotel']);
  }

  getlist(){
    this.hotelsService.getAllHotels().subscribe(
      res => {
        this.hotellist = res;
         console.log(res);
        this.showLoader = false;
      },
      err => { 
        console.log(err);
      }
    );
  }

  deleteHotel(){
    //console.log(this.userId);
    this.hotelsService.delete(this.hotelId).subscribe(
      res => {
        this.getlist();
      },
      err => { 
        console.log(err);
      }
    )
  }

  editHotel(){
    this.hotelsService.edit(this.hotelId).subscribe(
      res => {
        this.router.navigate(['/admin/addhotel', {hotelId: this.hotelId}]);
      },
      err => { 
        console.log(err);
      }
    )
  }
}
