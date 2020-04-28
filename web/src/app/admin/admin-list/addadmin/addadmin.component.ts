import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AdminService } from '../../../_services/admin.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;
  message: string;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  id: any;
  showWarningMessage: boolean;

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private adminService: AdminService,
    private route: ActivatedRoute,
  ) {
    this.route.params.forEach((urlParams) => {
      this.id = urlParams['userId'];
    });
   }

  ngOnInit() {
this.getUser();

    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.userForm.controls; }

  submit() {
    this.submitted = true;
    const username = this.userForm.value['email'];
    this.userForm.controls['username'].setValue(username);

    if (this.userForm.valid) {
      this.adminService.postUser(this.userForm.value).subscribe(
        res => {
          console.log(this.userForm.value);
          // this.resetForm();
          this.message = res['message'];
          if (this.message === "Admin registration is successful.") {
            this.showSucessMessage = true;
            setTimeout(() => this.showSucessMessage = false, 4000);
            this.resetForm();
            this.goBack();
          } else {
            this.showWarningMessage = true;
            setTimeout(() => this.showWarningMessage = false, 4000);
          }
        },
        err => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join('<br/>');
          }
          else
            this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }

  resetForm() {
    this.userForm.reset();
  }

  getUser() {
    this.adminService.getAdmin(this.id).subscribe(
      res => {
        this.userForm = this.formBuilder.group({
          id: [res['id']],
          firstname: [res['firstname']],
          lastname: [res['lastname']],
          username: [res['username']],
          email: [res['email']],
          password: [res['password']],
        })
      },
      err => {
        console.log(err);
      }
    );
  }

}
