import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerlist: Array<any>;
  customerLength: number;
  showLoader: boolean;

  constructor(private userService: UserService, private router: Router) {
    this.showLoader = true;
   }

  ngOnInit() {
    this.getlist();
  }

  getlist() {
    this.userService.getCustomers().subscribe(
      res => {
        this.customerlist = res['_embedded']['customers'];
        this.customerLength = this.customerlist['length'];
        this.showLoader = false;
      },
      err => {
        console.log(err);
      }
    );
  }
}
