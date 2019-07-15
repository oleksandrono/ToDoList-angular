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


  ngOnInit(): void {
    this.http.get('http://localhost:3000/lists').subscribe((data: List[]) => {
      this.lists = data;
    });
    this.http.get('http://localhost:3000/tasks').subscribe((data: Task[]) => {
      this.tasks = data;
    });

  }

  addList($event, inputListName: HTMLInputElement) {
    $event.preventDefault();

    if (inputListName.value === ' ' || inputListName.value.length < 1) {
      console.log('field must be not empty');
    }
    else {
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
        listName: inputListName.value
      };
      this.lists.push(list);
      inputListName.value = '';

      // ____________________post
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

      this.http.post('http://localhost:3000/lists', list, httpOptions)
        .subscribe(data => console.log('POST request is successful', data), error => console.error(error));
    }
  }

  chooseList(listId: any, listName: any) {
    this.currentListId = listId;
    document.getElementById('listNameText').innerText = `, in ${listName}.`;
    document.getElementById('task-container').style.display = 'block';
    document.getElementById('tasksHint').style.display = 'none';
  }


  addTask($event, inputTaskName: HTMLInputElement) {
    $event.preventDefault();

    if (inputTaskName.value === ' ' || inputTaskName.value.length < 1) {
      console.log('field must be not empty');
    } else {
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
        taskName: inputTaskName.value,
        done: false,
        listId: this.currentListId
      };

      this.tasks.push(task);
      inputTaskName.value = '';

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

      this.http.post('http://localhost:3000/tasks', task, httpOptions)
        .subscribe(data => console.log('POST request is successful', data), error => console.error(error));

    }
  }

}
