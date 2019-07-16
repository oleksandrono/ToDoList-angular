import {Component, Input, OnInit} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';

import { List } from './list';

import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})

export class AppComponent implements OnInit {

  lists: List[];
  tasks: Task[];

  constructor(private http: HttpClient) {}

  title = 'ToDoList App Angular';

  currentListId;
  currentListName;
  isDelete;
  isListChosen;
  firstLoad = true;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  ngOnInit(): void {
    this.http.get('http://localhost:3000/lists').subscribe((data: List[]) => {
      this.lists = data;
    });
    this.http.get('http://localhost:3000/tasks').subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }

  onSubmitList(inputName: string){
    let idList = [];
    if (this.lists.length > 0) {
      this.lists.forEach((element, index) => {
        idList.push(element.id);
      });
    }

    let listId = 1;
    if (this.lists.length === 0) {
      listId = 1;
    }
    else if (this.lists.length > 0) {
      for (let i = 1; i <= this.lists.length; i++) {
        listId = Math.max.apply(null, idList) + 1;
      }
    }

    const list = {
      id: listId,
      listName: inputName
    };
    this.lists.push(list);


    this.http.post('http://localhost:3000/lists', list, this.httpOptions)
      .subscribe(data => console.log('POST request is successful', data), error => console.error(error));
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

  chooseList(listId: any, listName: any) {
    this.firstLoad = false;
    this.isDelete = false;
    this.isListChosen = true;
    this.currentListId = listId;
    this.currentListName = listName;
  }

  onDelete(value: boolean) {
    this.isDelete = value;
    this.isListChosen = false;
  }
}
