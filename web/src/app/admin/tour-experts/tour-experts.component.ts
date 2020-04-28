import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { Location } from '@angular/common';
import { ExpertService } from '../../_services/expert.service';
@Component({
  selector: 'app-tour-experts',
  templateUrl: './tour-experts.component.html',
  styleUrls: ['./tour-experts.component.css']
})
export class TourExpertsComponent implements OnInit {
  showLoader: boolean;
  expertlist:any;
  expertId: any;
  constructor(private router: Router, private expertService: ExpertService, 
    private location: Location,) { 
    this.showLoader = true;
  }

  ngOnInit() {
    this.getlist();
  }

  addexpert(){
    this.router.navigate(['/admin/addexpert']);
  }

  getlist(){
    this.expertService.getAllExperts().subscribe(
      res => {
        this.expertlist = res;
         console.log(res);
        this.showLoader = false;
      },
      err => { 
        console.log(err);
      }
    );
  }

  delete(){
    //console.log(this.userId);
    this.expertService.deleteExpert(this.expertId).subscribe(
      res => {
        this.getlist();
      },
      err => { 
        console.log(err);
      }
    )
  }

  edit(){
    this.expertService.editExpert(this.expertId).subscribe(
      res => {
        this.router.navigate(['/admin/addexpert', {expertId: this.expertId}]);
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
