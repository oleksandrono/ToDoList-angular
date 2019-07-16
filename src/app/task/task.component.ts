import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.styl']
})
export class TaskComponent implements OnInit {

  @Input() task;
  @Input() tasks;
  @Input() currentListId;

  isEdit;
  isChecked;
  isDelete;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    if(this.task.done){
      this.isChecked = true;
    }
    else if(!this.task.done){
      this.isChecked = false;
    }
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  deleteTask(taskId: any) {
    this.isDelete = true;
    this.tasks.forEach((element, index) => {
      if (element.id === taskId) {
        this.tasks.splice(index, 1);

        this.http.delete(`http://localhost:3000/tasks/${element.id}`, this.httpOptions)
          .subscribe(() => console.log('DELETE is successful'), error => console.error(error));
      }
    });
  }

  editTask(editTaskField: HTMLInputElement) {
    this.isEdit = true;
    editTaskField.value = this.task.taskName;
  }

  saveEdit(editTaskField: HTMLInputElement, taskId: any) {
    this.isEdit = false;
    if (editTaskField.value === ' ' || editTaskField.value.length < 1) {
      console.log('field must be not empty');
    }
    else {
      this.tasks.forEach((element) => {
        if(element.taskName===editTaskField.value){
          this.cancelEdit();
        }
        else {
          if (element.id === taskId) {
            element.taskName = editTaskField.value;

            //________________fix here maybe
            document.getElementById(`taskName${taskId}`).innerText = editTaskField.value;
            //________________fix here maybe

            let task = {
              id: element.id,
              taskName: editTaskField.value,
              done: element.done,
              listId: element.listId
            };

            this.http.put(`http://localhost:3000/tasks/${element.id}`, task, this.httpOptions)
              .subscribe((data) => console.log('PUT is successful', data), error => console.error(error));
          }
        }
      });
    }
  }

  cancelEdit() {
    this.isEdit = false;
  }

  isCompleted($event, taskId: any) {
    this.tasks.forEach((element)=>{
      if(element.id===taskId){
        if ($event.target.checked) {
          let task = {
            id: element.id,
            taskName: element.taskName,
            done: true,
            listId: element.listId
          };

          this.isChecked = true;
          console.log(this.isChecked);

          this.http.put(`http://localhost:3000/tasks/${element.id}`, task, this.httpOptions)
            .subscribe((data) => console.log('PUT is successful', data), error => console.error(error));
        }
        else {
          let task = {
            id: element.id,
            taskName: element.taskName,
            done: false,
            listId: element.listId
          };

          this.isChecked = false;
          console.log(this.isChecked);

          this.http.put(`http://localhost:3000/tasks/${element.id}`, task, this.httpOptions)
            .subscribe((data) => console.log('PUT is successful', data), error => console.error(error));
        }
      }
    });
  }


}
