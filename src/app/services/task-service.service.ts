import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  httpOptions;
  urlTasks;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.urlTasks = 'http://localhost:3000/tasks';
  }

  getTasks(){
    return this.http.get(this.urlTasks);
  }

  addTask(task){
    return this.http.post(this.urlTasks, task, this.httpOptions);
  }

  deleteTask(elementId){
    return this.http.delete(`${this.urlTasks}/${elementId}`, this.httpOptions);
  }

  putTask(elementId, task){
    return this.http.put(`${this.urlTasks}/${elementId}`, task, this.httpOptions)
  }

}
