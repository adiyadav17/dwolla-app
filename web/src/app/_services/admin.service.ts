import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../shared/admin.model';
import { LoginUser } from '../shared/login.model';
import { Response, RequestOptions, Headers, Http, URLSearchParams} from '@angular/http';
import { from } from 'rxjs';
import 'rxjs/add/operator/map'
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public headers = new Headers({ 'Content-Type': 'application/json' });
  public options = new RequestOptions({ headers: this.headers });
  selectedUser: User = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password:''
  };

  loginUser: LoginUser = {
    email:'',
    password:''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HttpMethods

  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/admin/register', user);
  }

  login(user: LoginUser) {
    return this.http.post(environment.apiBaseUrl + '/admin/login', user);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/admin/profile');
  }


  getAdminlist() {
    return this.http.get(environment.apiBaseUrl + '/admin');
  }

  deleteAdmin(userId) {
    return this.http.delete(environment.apiBaseUrl + '/admin/'+userId);
  }

  getAdmin(userId) {
    return this.http.get(environment.apiBaseUrl + '/admin/user/'+userId);
  }

  update(userId, user: User) {
    return this.http.put(environment.apiBaseUrl+ '/admin/'+userId, user);
  }

  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('adtoken', token);
  }

  getToken() {
    return localStorage.getItem('adtoken');
  }

  deleteToken() {
    localStorage.removeItem('adtoken');
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
