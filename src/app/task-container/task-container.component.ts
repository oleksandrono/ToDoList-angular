import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../task";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.styl']
})
export class TaskContainerComponent implements OnInit {

  tasks: Task[];


  @Input() currentListId;
  @Input() currentListName;
  @Input() isListChosen;
  @Input() isListDelete;
  @Input() isFirstLoad;


  urlTasks = 'http://localhost:3000/tasks';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(this.urlTasks).subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }

  onSubmitTask(inputName: string){
    const idList = [];
    if (this.tasks.length > 0) {
      this.tasks.forEach((element, index) => {
        idList.push(element.id);
      });
    }
    let taskId = 1;
    if (this.tasks.length === 0) {
      taskId = 1;
    } else if (this.tasks.length > 0) {
      for (let i = 1; i <= this.tasks.length; i++) {
        taskId = Math.max.apply(null, idList) + 1;
      }
    }

    const task = {
      id: taskId,
      taskName: inputName,
      done: false,
      listId: this.currentListId
    };

    this.tasks.push(task);

    this.http.post('http://localhost:3000/tasks', task, this.httpOptions)
      .subscribe(data => console.log('POST request is successful', data), error => console.error(error));
  }

}
