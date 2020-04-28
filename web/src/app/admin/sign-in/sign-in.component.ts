import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AdminService } from '../../_services/admin.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(private AdminService: AdminService,private router : Router) {
    this.showLoader = false;
   }
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  showLoader: boolean;
  showWarningMessage:boolean;
  message: string;
  
  ngOnInit() {
    console.log('login page')
    if(this.AdminService.isLoggedIn())
    this.router.navigateByUrl('/admin/dashboard');
  }

  onSubmit(form : NgForm){
    this.showLoader = true;
    this.AdminService.login(form.value).subscribe(
      res => {
        this.AdminService.setToken(res['token']);
        this.router.navigateByUrl('/admin/dashboard');
        
        this.message = res['message'];
          if(this.message === "User registration is successful."){
            this.showSucessMessage = true;
            setTimeout(() => this.showSucessMessage = false, 4000);
          }else{
            this.showWarningMessage = true;
            this.showLoader = false;
            setTimeout(() => this.showWarningMessage = false, 4000);
          }
      },
      err => {
        this.showLoader = false;
        this.serverErrorMessages = err.error.message;
      }
    );
  }

}
