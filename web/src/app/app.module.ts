// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CustomerComponent } from './customer/customer/customer.component';
import { AddComponent } from './customer/add/add.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { UserService } from './_services/user.service';

import { appRoutes } from './routes';

// other
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomerComponent,
    AddComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [
  UserService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
