import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ListServiceService {

  httpOptions;
  urlList;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.urlList = 'http://localhost:3500/lists';
  }

  getLists(){
    return this.http.get(this.urlList);
  }

  addList(list){
    return this.http.post(this.urlList, list, this.httpOptions);
  }

  deleteList(elementId){
    return this.http.delete(`${this.urlList}/${elementId}`, this.httpOptions)
  }

}
