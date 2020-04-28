import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
export interface Hotels {
  name: string;
  city: string;
  rating: string;
  id?: string
}
@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  constructor(private http: HttpClient) { }

  getAllHotels(){
    return this.http.get(environment.apiBaseUrl + '/hotel');
  }

  get(id){
    return this.http.get(environment.apiBaseUrl + '/hotel/'+id);
  }

  delete(id){
    return this.http.delete(environment.apiBaseUrl + '/hotel/'+id);
  }

  edit(id){
    return this.http.get(environment.apiBaseUrl + '/hotel/'+id);
  }

  add(hotels: Hotels){
    return this.http.post(environment.apiBaseUrl + '/hotel', hotels);
  }

  update(id, hotels: Hotels){
    return this.http.post(environment.apiBaseUrl + '/hotel/'+id, hotels);
  }
}
