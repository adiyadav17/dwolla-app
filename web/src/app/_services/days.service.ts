import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
export interface Days {
  cid:string;
  day: string;
  date: string;
  title: string;
  description: string;
  hotel: string;
  id?: string
}
@Injectable({
  providedIn: 'root'
})
export class DaysService {

  constructor(private http: HttpClient) { }

  getbyJourney(cid){
    return this.http.get(environment.apiBaseUrl + '/days/bycid/'+cid);
  }

  addDay(days: Days){
    return this.http.post(environment.apiBaseUrl + '/days', days);
  }

  getDay(id){
    return this.http.get(environment.apiBaseUrl + '/days/'+id);
  }


  update(id, days: Days){
    return this.http.post(environment.apiBaseUrl + '/days/'+id, days);
  }

  delete(id) {
    return this.http.delete(environment.apiBaseUrl + '/days/'+id);
  }
}
