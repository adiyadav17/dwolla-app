import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
export interface Experts {
  firstname: string;
  lastname: string;
  designation: string;
  description: string;
  thumb: string;
  id?: string
}
@Injectable({
  providedIn: 'root'
})
export class ExpertService {

  constructor(private http: HttpClient) { }

  getAllExperts(){
    return this.http.get(environment.apiBaseUrl + '/expert');
  }

  getExpert(id){
    return this.http.get(environment.apiBaseUrl + '/expert/'+id);
  }

  deleteExpert(id){
    return this.http.delete(environment.apiBaseUrl + '/expert/'+id);
  }

  editExpert(id){
    return this.http.get(environment.apiBaseUrl + '/expert/'+id);
  }

  addExpert(experts: Experts){
    return this.http.post(environment.apiBaseUrl + '/expert', experts);
  }

  updateExpert(id, experts: Experts){
    return this.http.post(environment.apiBaseUrl + '/expert/'+id, experts);
  }
}
