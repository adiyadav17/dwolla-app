import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { UserService } from '../../_services/user.service';
import { userStaus } from '../../shared/userstaus.modal'
import { Router} from "@angular/router";
@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  userlist: any;
  userId: any;
  status: boolean;
  isactive: any;
  statusVal: Array<any>;
  userdata: object;
  userobj: any;

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.getlist()
  }

  getlist(){
    this.adminService.getAdminlist().subscribe(
      res => {
        this.userlist = res;
        console.log(this.userlist);
      },
      err => { 
        console.log(err);
      }
    );
  }

  deleteuser(){
    console.log(this.userId);
    this.adminService.deleteAdmin(this.userId).subscribe(
      res => {
        this.getlist();
      },
      err => { 
        console.log(err);
      }
    )
  }

  edituser(){
    // this.adminService.getAdmin(this.userId).subscribe(
    //   res => {
        this.router.navigate(['/admin/addadmin/', {userId: this.userId}]);
    //   },
    //   err => { 
    //     console.log(err);
    //   }
    // )
  }

  addAdmin(){
    this.router.navigate(['/admin/addadmin']);
  }

  updateUser(){
    this.adminService.getAdmin(this.userId).subscribe(
      res => {
        this.router.navigate(['/admin/edit', {userId: this.userId}]);
      },
      err => { 
        console.log(err);
      }
    )
  }
}
