import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpertService } from '../../../_services/expert.service';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-add-expert',
  templateUrl: './add-expert.component.html',
  styleUrls: ['./add-expert.component.css']
})
export class AddExpertComponent implements OnInit {
  expertform: FormGroup;
  id: any;
  imgurl: string;
  resImage: string;
  passThumb: string;
  submitted = false;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  constructor(
    private formBuilder: FormBuilder,
    private expertService: ExpertService, 
    private location: Location,
    private router: Router,
    private route: ActivatedRoute, ) {
    this.route.params.forEach((urlParams) => {
      this.id = urlParams['expertId'];
    });
  }

  ngOnInit() {
    this.expertform = this.formBuilder.group({
      id: [],
      firstname: ['', Validators.required],
      designation: ['', Validators.required],
      description: ['', Validators.required],
      thumb: ['', Validators.required],
    });
    if(this.id){
      this.getExpert();
    }
    
  }
  get f() { return this.expertform.controls; }

  onSubmit() {
    this.submitted = true;
    const idExists = this.id;
    if(localStorage.getItem('thumb')){
      this.expertform.controls['thumb'].setValue(localStorage.getItem('thumb'));
    }

    if (idExists === undefined) {
      if (this.expertform.valid) {
        this.expertService.addExpert(this.expertform.value).subscribe(
          res => {
            this.goBack();
            this.showSucessMessage = true;
            setTimeout(() => this.showSucessMessage = false, 4000);
          },
          err => {
            this.goBack();
            console.log(err);
          }
        );
      }
    }else{
      this.expertform.controls['id'].setValue(this.id);
      this.expertService.updateExpert(this.id, this.expertform.value).subscribe(
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

  getExpert() {
    this.expertService.getExpert(this.id).subscribe(
      res => {
        console.log(res);
        this.passThumb = res['thumb'];
        this.expertform = this.formBuilder.group({
          id: [res['id']],
          firstname: [res['firstname']],
          designation: [res['designation']],
          description: [res['description']],
          thumb: [res['thumb']],
        })
      },
      err => {
        console.log(err);
      }
    );
  }

  goBack(): void {
    this.location.back();
    this.restLocalStorage();
  }

  restLocalStorage(){
    localStorage.removeItem('thumb');
  }
}
