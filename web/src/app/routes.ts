import { Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer/customer.component';
import { AddComponent } from './customer/add/add.component';
export const appRoutes: Routes = [
    {
      path: 'customers', component: CustomerComponent,
    },
    {
      path: 'addcustomers', component: AddComponent,
    },
    {
      path: '', redirectTo: '/customers', pathMatch: 'full'
    }
];
