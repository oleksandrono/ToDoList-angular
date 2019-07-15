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


  deleteTask(taskId: any) {
    this.tasks.forEach((element, index) => {
      if (element.id === taskId) {
        this.tasks.splice(index, 1);
        document.getElementById('task' + element.id).remove();

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
        };

        this.http.delete(`http://localhost:3000/tasks/${element.id}`, httpOptions)
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
        if (element.id === taskId) {
          element.taskName = editTaskField.value;
          document.getElementById(`taskName${taskId}`).innerText = editTaskField.value;
          document.getElementById(`defaultButtons${taskId}`).style.display = 'flex';
          document.getElementById(`editButtons${taskId}`).style.display = 'none';

          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };
          let task = {
            id: element.id,
            taskName: editTaskField.value,
            done: element.done,
            listId: element.listId
          };

          this.http.put(`http://localhost:3000/tasks/${element.id}`, task, httpOptions)
            .subscribe((data) => console.log('PUT is successful', data), error => console.error(error));

        }
      });
    }
  }

  cancelEdit(taskId: any) {
    document.getElementById(`defaultButtons${taskId}`).style.display = 'flex';
    document.getElementById(`editButtons${taskId}`).style.display = 'none';
  }


  isCompleted($event, taskId: any) {
    if ($event.target.checked) {
      document.getElementById(`task${taskId}`).style.backgroundColor = '#d2d2d2';
      document.getElementById(`taskName${taskId}`).style.textDecoration = 'line-through';
      document.getElementById(`editTask${taskId}`).setAttribute('disabled', 'true');
      document.getElementById(`deleteTask${taskId}`).setAttribute('disabled', 'true');
    } else {
      document.getElementById(`task${taskId}`).style.backgroundColor = 'transparent';
      document.getElementById(`taskName${taskId}`).style.textDecoration = 'none';
      document.getElementById(`editTask${taskId}`).removeAttribute('disabled');
      document.getElementById(`deleteTask${taskId}`).removeAttribute('disabled');
    }


  }
}
