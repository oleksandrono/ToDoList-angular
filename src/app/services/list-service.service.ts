import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {List} from "../list";

@Injectable({
  providedIn: 'root'
})
export class ListServiceService {

  urlList;

  constructor(private http: HttpClient) {
    this.urlList = 'http://localhost:3000/lists';
  }

  getLists(): Observable<List[]>{
    return this.http.get<List[]>(this.urlList);
  }

  addList(list: List): Observable<List>{
    return this.http.post<List>(this.urlList, list);
  }

  deleteList(elementId): Observable<List>{
    return this.http.delete<List>(`${this.urlList}/${elementId}`)
  }

}
