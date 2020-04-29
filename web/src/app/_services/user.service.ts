import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../shared/user.model';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    type: '',
    businessName: ''
  };

  constructor(private http: HttpClient) { }

  addCustomer(user: User) {
    return this.http.post(environment.apiBaseUrl + '/users/add', user);
  }

  getCustomers() {
    return this.http.get(environment.apiBaseUrl + '/users/get');
  }
}
