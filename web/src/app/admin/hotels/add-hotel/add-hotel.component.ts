import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelsService } from '../../../_services/hotels.service';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent implements OnInit {
  hotelform: FormGroup;
  id: any;
  submitted = false;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  constructor(
    private formBuilder: FormBuilder,
    private hotelsService: HotelsService, 
    private location: Location,
    private router: Router,
    private route: ActivatedRoute, ) {
    this.route.params.forEach((urlParams) => {
      this.id = urlParams['hotelId'];
    });
  }

  ngOnInit() {
    this.hotelform = this.formBuilder.group({
      id: [],
      hname: ['', Validators.required],
      city: ['', Validators.required],
      rating: ['', Validators.required],
    });

    if(this.id){
      this.getHotel();
    }
    
  }
  get f() { return this.hotelform.controls; }
  onSubmit() {
    this.submitted = true;
    const idExists = this.id;
    console.log(this.hotelform.value);
    if (idExists === undefined) {
      if (this.hotelform.valid) {
        this.hotelsService.add(this.hotelform.value).subscribe(
          res => {
            this.goBack();
            this.showSucessMessage = true;
            setTimeout(() => this.showSucessMessage = false, 4000);
            
          },
          err => {
            console.log(err);
          }
        );
      }
    }else{
      this.hotelform.controls['id'].setValue(this.id);
      this.hotelsService.update(this.id, this.hotelform.value).subscribe(
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

  getHotel() {
    this.hotelsService.get(this.id).subscribe(
      res => {
        console.log(res);
    
        this.hotelform = this.formBuilder.group({
          id: [res['id']],
          hname: [res['hname']],
          city:[res['city']],
          rating: [res['rating']],
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
