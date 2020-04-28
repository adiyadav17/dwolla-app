import { Routes } from '@angular/router';
import { SignInComponent } from './admin/sign-in/sign-in.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddadminComponent } from './admin/admin-list/addadmin/addadmin.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { TourExpertsComponent } from './admin/tour-experts/tour-experts.component';
import { AddExpertComponent } from './admin/tour-experts/add-expert/add-expert.component';
import { HotelsComponent } from './admin/hotels/hotels.component';
import { AddHotelComponent } from './admin/hotels/add-hotel/add-hotel.component';
import { JourneysComponent } from './admin/journeys/journeys.component';
import { AddjourneysComponent } from './admin/journeys/addjourneys/addjourneys.component';
import { DaysComponent } from './admin/journeys/days/days.component';
import { AdddaysComponent } from './admin/journeys/days/adddays/adddays.component';
import { AuthGuard } from './auth/auth.guard';
import { from } from 'rxjs';

export const appRoutes: Routes = [
    // {
    //     path: 'signup', component: AdminComponent,
    //     children: [{ path: '', component: SignUpComponent }]
    // },
    {
        path: 'login', component: AdminComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'admin', component: AdminComponent,
        canActivate:[AuthGuard],
        children: [
            { path: '', component: DashboardComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'addadmin', component: AddadminComponent },
            { path: 'adminlist', component: AdminListComponent },
            { path: 'tourexperts', component: TourExpertsComponent},
            { path: 'addexpert', component: AddExpertComponent},
            { path: 'hotels', component: HotelsComponent},
            { path: 'addhotel', component: AddHotelComponent},
            { path: 'journeys', component: JourneysComponent},
            { path: 'addjourneys', component: AddjourneysComponent},
            { path: 'days', component: DaysComponent},
            { path: 'adddays', component: AdddaysComponent},
        ]
    },
    {
        path: 'login', component: AdminComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];
