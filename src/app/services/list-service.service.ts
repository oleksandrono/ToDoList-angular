import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ListServiceService {

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  urlList = 'http://localhost:3000/lists';

  // addList(list){
  //   return this.http.post(this.urlList, list, this.httpOptions);
  // }

}
