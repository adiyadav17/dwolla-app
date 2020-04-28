// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { DatePipe } from '@angular/common';
import {FileUploadModule} from "ng2-file-upload/file-upload/file-upload.module";
// Admin components
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { SignInComponent } from './admin/sign-in/sign-in.component';
import { SignUpComponent } from './admin/sign-up/sign-up.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';

// routes
import { appRoutes } from './routes';

// other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HeaderLoginComponent } from './header-login/header-login.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminService } from './_services/admin.service';
import { UserService } from './_services/user.service';
import { TruncateTextPipe } from './_pipes/truncate-text.pipe';
import { AddadminComponent } from './admin/admin-list/addadmin/addadmin.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { TourExpertsComponent } from './admin/tour-experts/tour-experts.component';
import { AddExpertComponent } from './admin/tour-experts/add-expert/add-expert.component';
import { ImageuploadComponent } from './shared/imageupload/imageupload.component';
import { HotelsComponent } from './admin/hotels/hotels.component';
import { AddHotelComponent } from './admin/hotels/add-hotel/add-hotel.component';
import { JourneysComponent } from './admin/journeys/journeys.component';
import { AddjourneysComponent } from './admin/journeys/addjourneys/addjourneys.component';
import { DaysComponent } from './admin/journeys/days/days.component';
import { AdddaysComponent } from './admin/journeys/days/adddays/adddays.component';
import { BanneruploadComponent } from './shared/bannerupload/bannerupload.component';
import { FileuploadComponent } from './shared/fileupload/fileupload.component';
import { NgxEditorModule } from 'ngx-editor';
import { IconComponent } from './shared/icon/icon.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HeaderComponent,
    AdminComponent,
    DashboardComponent,
    HeaderLoginComponent,
    AdminHeaderComponent,
    TruncateTextPipe,
    AddadminComponent,
    AdminListComponent,
    LoaderComponent,
    TourExpertsComponent,
    AddExpertComponent,
    TourExpertsComponent,
    AddExpertComponent,
    ImageuploadComponent,
    BanneruploadComponent,
    FileuploadComponent,
    HotelsComponent,
    AddHotelComponent,
    JourneysComponent,
    AddjourneysComponent,
    DaysComponent,
    AdddaysComponent,
    IconComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FileUploadModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgSelectModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgxEditorModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AdminService, DatePipe, UserService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
