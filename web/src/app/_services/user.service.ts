import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../shared/user.model';
import { LoginUser } from '../shared/login.model';
import { userStaus } from '../shared/userstaus.modal'
import { Response, RequestOptions, Headers, Http, URLSearchParams} from '@angular/http';
import { from } from 'rxjs';
import 'rxjs/add/operator/map'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public headers = new Headers({ 'Content-Type': 'application/json' });
  public options = new RequestOptions({ headers: this.headers });
  selectedUser: User = {
    firstname: '',
    lastname: '',
    email: '',
    country: '',
    company:'',
    isactive: false,
    password:'',
    type:'',
    cardnumber: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/users/register', user);
  }

  getUserlist() {
    return this.http.get(environment.apiBaseUrl + '/userlist');
  }

  deleteUser(userId) {
    return this.http.delete(environment.apiBaseUrl + '/userlist/'+userId);
  }

  getUser(userId) {
    console.log(userId);
    return this.http.get(environment.apiBaseUrl + '/userlist/'+userId);
  }

  update(userId, user: User) {
    return this.http.post(environment.apiBaseUrl+ '/userlist/'+userId, user);
  }

  updateUserStatus(userId, status, userName, userEmail) {
    let body = JSON.stringify([{"propName": "isactive", "value": status}]);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.patch(environment.apiBaseUrl+ '/userlist/'+userId+'&'+userName+'&'+userEmail, body,{
        headers: headers,
        observe: 'response'
    }
  )}

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
