import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { map } from  'rxjs/operators';


@Injectable()

export class FileService {
    
    constructor(private _http:HttpClient){}
    uploadFile(file:string){
        var body = {filename:file};

        return this._http.post(`${this.SERVER_URL}/upload.php`,body,{
             responseType : 'blob',
             headers:new HttpHeaders().append('Content-Type','application/json')
        });
    }

    SERVER_URL: string = "https://www.creative.world/";
    uploadFilep(data){
        var body = data;

        return this._http.post(`${this.SERVER_URL}/upload.php`,body,{
             responseType : 'blob',
             headers:new HttpHeaders().append('Content-Type','application/json')
        });
        // let uploadURL = `${this.SERVER_URL}/upload.php`;
        // return this._http.post<any>(uploadURL, data);
    }
}