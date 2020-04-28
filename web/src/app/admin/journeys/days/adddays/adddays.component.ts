import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { DaysService } from '../../../../_services/days.service';
import { HotelsService } from '../../../../_services/hotels.service';
@Component({
  selector: 'app-adddays',
  templateUrl: './adddays.component.html',
  styleUrls: ['./adddays.component.css']
})
export class AdddaysComponent implements OnInit {
  dayform: FormGroup;
  id;
  cid: any;
  hotellist;
  submitted = false;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private daysService: DaysService, 
    private hotelsService: HotelsService,
    private location: Location,
    private route: ActivatedRoute, ) {
      this.route.params.forEach((urlParams) => {
        this.cid = urlParams['tourid'];
        this.id = urlParams['id'];
      });
  }

  ngOnInit() {
    this.dayform = this.formBuilder.group({
      id: [],
      cid: [],
      day: ['', Validators.required],
      title: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      hotel: [''],
    });
    //console.log(this.cid);
    this.getHotellist();

    if(this.id){
      this.getDay();
    }
  }
  get f() { return this.dayform.controls; }

  onSubmit() {
    this.submitted = true;
    const idExists = this.id;
   //console.log(this.dayform.value);
    
    if (idExists === undefined || idExists === null) {
      console.log('1');
      if (this.dayform.valid) {
        this.dayform.controls['cid'].setValue(this.cid);
        console.log(this.dayform.value);
        this.daysService.addDay(this.dayform.value).subscribe(
          res => {
            this.goBack();
            this.showSucessMessage = true;
            setTimeout(() => this.showSucessMessage = false, 4000);
            
          },
          err => {
            console.log(err);
            this.goBack();
          }
         
        );
      }
    }else{
      console.log('2');
      this.dayform.controls['id'].setValue(this.id);
      this.daysService.update(this.id, this.dayform.value).subscribe(
        res => {
          this.goBack();
          this.showSucessMessage = true;
          setTimeout(() => this.showSucessMessage = false, 4000);
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  getHotellist(){
    this.hotelsService.getAllHotels().subscribe(
      res => {
        this.hotellist = res;
         console.log(res);
      },
      err => { 
        console.log(err);
      }
    );
  }

  getDay(){
    this.daysService.getDay(this.id).subscribe(
      res => {
        this.dayform = this.formBuilder.group({
          id: [res['id']],
          cid: [res['cid']],
          day: [res['day']],
          title: [res['title']],
          date: [res['date']],
          description:[res['description']],
          hotel:[res['hotel']],
        })
      },
      err => { 
        console.log(err);
      }
    );
  }
  
  goBack(): void {
    this.location.back();
  }

}
