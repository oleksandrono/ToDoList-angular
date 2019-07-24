import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Task} from "../task";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  urlTasks;

  constructor(private http: HttpClient) {
    this.urlTasks = 'http://localhost:3000/tasks';
  }

  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.urlTasks);
  }

  getTaskByListId(listId): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.urlTasks}?listId=${listId}`);
  }

  addTask(task: Task): Observable<Task>{
    return this.http.post<Task>(this.urlTasks, task);
  }

  deleteTask(elementId): Observable<Task>{
    return this.http.delete<Task>(`${this.urlTasks}/${elementId}`);
  }

  putTask(elementId, task: Task): Observable<Task>{
    return this.http.put<Task>(`${this.urlTasks}/${elementId}`, task)
  }

}
