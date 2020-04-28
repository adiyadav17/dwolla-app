import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { JourneysService } from '../../../_services/journeys.service';
import { ExpertService } from '../../../_services/expert.service';

import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-addjourneys',
  templateUrl: './addjourneys.component.html',
  styleUrls: ['./addjourneys.component.css']
})
export class AddjourneysComponent implements OnInit {
  journeyform: FormGroup;
  id: any;
  submitted = false;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  expertlist;
  relatedlist;
  passThumb: string;
  passIcon: string;
  passFile: string;
  passBanner: string;
  selectedthem;
  selectedexpert;
  selectedrelated = []
  themItems = [];
  expertItems = [];

  constructor(
    private formBuilder: FormBuilder,
    private journeysService: JourneysService,
    private expertService: ExpertService,
    private httpService: HttpClient,
    private location: Location,
    private route: ActivatedRoute, ) {
      this.route.params.forEach((urlParams) => {
        this.id = urlParams['tourid'];
      });
  }
  ngOnInit() {
    this.journeyform = this.formBuilder.group({
      id: [],
      order:['', Validators.required],
      title: ['', Validators.required],
      sortdescription: ['', Validators.required],
      description: ['', Validators.required],
      thumb: ['', Validators.required],
      icon: [''],
      banner: ['', Validators.required],
      attachment: ['', Validators.required],
      tourdate: ['', Validators.required],
      tourduration: ['', Validators.required],
      tourcitys: ['', Validators.required],
      tourdays: ['', Validators.required],
      advantages: ['', Validators.required],
      them: ['', Validators.required],
      expert:['', Validators.required],
      related: []
    });
    if(this.id){
      this.getJourney();
    }
    this.getExperts();
    this.getJourneyList();


    this.httpService.get('assets/json/color.json').subscribe(
      data => {
        this.themItems = data as string [];	 // FILL THE ARRAY WITH DATA.
        console.log(this.themItems);
      },
      err => {
        console.log(err);
      }
    );

  }
  get f() { return this.journeyform.controls; }

  onSubmit() {
    this.submitted = true;
    const idExists = this.id;
    if(localStorage.getItem('thumb')){
      this.journeyform.controls['thumb'].setValue(localStorage.getItem('thumb'));
    }
    if(localStorage.getItem('banner')){
      this.journeyform.controls['banner'].setValue(localStorage.getItem('banner'))
    }
    if(localStorage.getItem('file')){
      this.journeyform.controls['attachment'].setValue(localStorage.getItem('file'))
    }
    if(localStorage.getItem('icon')){
      this.journeyform.controls['icon'].setValue(localStorage.getItem('icon'))
    }

    console.log(this.journeyform.value);
    if (idExists === undefined) {
      if (this.journeyform.valid) {
        this.journeysService.addJourney(this.journeyform.value).subscribe(
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
      this.journeyform.controls['id'].setValue(this.id);
      this.journeysService.updateJourney(this.id, this.journeyform.value).subscribe(
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


  getExperts() {
    this.expertService.getAllExperts().subscribe(
      res => {
        this.expertlist = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  getJourney() {
    this.journeysService.getJourney(this.id).subscribe(
      res => {
        console.log(res);
        this.passThumb = res['thumb'];
        this.passFile = res['attachment'];
        this.passBanner = res['banner'];
        this.passIcon = res['icon'];
        this.selectedthem = res['them'];
        this.selectedexpert = res['expert'];
        this.selectedrelated = res['related'];
        console.log(this.selectedrelated);

        this.journeyform = this.formBuilder.group({

          id: [res['id']],
          order: [res['order']],
          title: [res['title']],
          sortdescription: [res['sortdescription']],
          description: [res['description']],
          thumb: [res['thumb']],
          banner: [res['banner']],
          icon: [res['icon']],
          attachment: [res['attachment']],
          tourdate: [res['tourdate']],
          tourduration: [res['tourduration']],
          tourcitys: [res['tourcitys']],
          tourdays: [res['tourdays']],
          advantages: [res['advantages']],
          expert: [res['expert']],
          them: [res['them']],
          related: [res['related']],
        })
      },
      err => {
        console.log(err);
      }
    );
  }

  getJourneyList(){
    this.journeysService.getJourneylist().subscribe(
      res => {
        this.relatedlist = res;
        console.log(res);
      })
  }

  goBack(): void {
    this.location.back();
    this.restLocalStorage();
  }

  restLocalStorage(){
    localStorage.removeItem('thumb');
    localStorage.removeItem('banner');
    localStorage.removeItem('file');
    localStorage.removeItem('icon');
  }

}
