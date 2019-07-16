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

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  deleteTask(taskId: any) {
    this.tasks.forEach((element, index) => {
      if (element.id === taskId) {
        this.tasks.splice(index, 1);
        document.getElementById('task' + element.id).remove();

        this.http.delete(`http://localhost:3000/tasks/${element.id}`, this.httpOptions)
          .subscribe(() => console.log('DELETE is successful'), error => console.error(error));
      }
    });
  }

  editTask(editTaskField: HTMLInputElement, taskId: any) {
    document.getElementById(`defaultButtons${taskId}`).style.display = 'none';
    document.getElementById(`editButtons${taskId}`).style.display = 'flex';
    editTaskField.value = this.task.taskName;
  }

  saveEdit(editTaskField: HTMLInputElement, taskId: any) {
    if (editTaskField.value === ' ' || editTaskField.value.length < 1) {
      console.log('field must be not empty');
    }
    else {
      this.tasks.forEach((element, index) => {
        if(element.taskName===editTaskField.value){
          this.cancelEdit(element.id);
        }
        else {
          if (element.id === taskId) {
            element.taskName = editTaskField.value;
            document.getElementById(`taskName${taskId}`).innerText = editTaskField.value;
            document.getElementById(`defaultButtons${taskId}`).style.display = 'flex';
            document.getElementById(`editButtons${taskId}`).style.display = 'none';


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

  cancelEdit(taskId: any) {
    document.getElementById(`defaultButtons${taskId}`).style.display = 'flex';
    document.getElementById(`editButtons${taskId}`).style.display = 'none';
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

          this.http.put(`http://localhost:3000/tasks/${element.id}`, task, this.httpOptions)
            .subscribe((data) => console.log('PUT is successful', data), error => console.error(error));

          document.getElementById(`taskName${taskId}`).style.textDecoration = 'line-through';
          document.getElementById(`taskName${taskId}`).style.color = '#ababab';
        }
        else {
          let task = {
            id: element.id,
            taskName: element.taskName,
            done: false,
            listId: element.listId
          };

          this.http.put(`http://localhost:3000/tasks/${element.id}`, task, this.httpOptions)
            .subscribe((data) => console.log('PUT is successful', data), error => console.error(error));

          document.getElementById(`taskName${taskId}`).style.textDecoration = 'none';
          document.getElementById(`taskName${taskId}`).style.color = '#000000';
        }
      }
    });
  }


}
