import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  cutomerForm: FormGroup;
  submitted = false;
  message: string;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  showLoader: boolean;

  showWarningMessage: boolean;

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder, ) {
    this.showLoader = false;
  }

  ngOnInit() {
    this.cutomerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      type: ['', Validators.required],
      businessName: ['', Validators.required],
    });
  }

  get f() { return this.cutomerForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.cutomerForm.controls['type'].setValue('receive-only');

    if (this.cutomerForm.valid) {
      this.showLoader = true;

      this.userService.addCustomer(this.cutomerForm.value).subscribe(
        res => {
          this.showLoader = false;
          this.router.navigateByUrl('/customers');
        },
        err => {
          this.showLoader = false;
          this.serverErrorMessages = err.error.message;
          setTimeout(() => this.showSucessMessage = false, 4000);
        },
      );
    }
  }
}
