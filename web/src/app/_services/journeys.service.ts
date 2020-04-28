import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Response, RequestOptions, Headers, Http, URLSearchParams } from '@angular/http';

export interface Journey {
  title: String;
  sortdescription:String;
  description:String;
  thumb:String;
  banner:String;
  attachment:String;
  tourdate:Date;
  tourduration:String;
  tourcitys:String;
  tourdays:String;
  advantages:String;
  expert:string;
  id?: string
}

@Injectable({
  providedIn: 'root'
})
export class JourneysService {

  public headers = new Headers({ 'Content-Type': 'application/json' });
  public options = new RequestOptions({ headers: this.headers });
  AuthHeader = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
  constructor(private http: HttpClient) { }


  getJourneylist() {
    return this.http.get(environment.apiBaseUrl + '/journeys');
  }

  addJourney(journey: Journey) {
    return this.http.post(environment.apiBaseUrl + '/journeys', journey, this.AuthHeader);
  }

  getJourney(id) {
    return this.http.get(environment.apiBaseUrl + '/journeys/' + id);
  }

  updateJourney(id, journey: Journey) {
    return this.http.post(environment.apiBaseUrl + '/journeys/' + id, journey);
  }

  deleteJourney(id) {
    return this.http.delete(environment.apiBaseUrl + '/journeys/' + id);
  }

  
}




