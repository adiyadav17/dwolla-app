import { Component, OnInit } from '@angular/core';
import { AdminService } from '../_services/admin.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userDetails;
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.adminService.getUserProfile().subscribe(
      res => {
        console.log(res);
        this.userDetails = res;
        
      },
      err => { 
        console.log(err);
      }
    );
  }

  onLogout(){
    this.adminService.deleteToken();
    this.router.navigate(['/login']);
  }

}
