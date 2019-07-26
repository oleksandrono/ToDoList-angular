import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Task} from "../../../task";
import {TaskServiceService} from "../../../services/task-service.service";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.styl']
})
export class TaskContainerComponent implements OnInit, OnChanges {

  tasks: Task[];

  @Input() getListData;

  currentListId;

  constructor(private taskService: TaskServiceService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getTasks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.route.paramMap.pipe(
      map(p => +p.get('id')))
      .subscribe(data => {
        this.currentListId = data;
      });
    if (changes.getListData.currentValue.list.listId === this.currentListId) {
      this.getTasks();
    }
  }

  getTasks(){
    this.taskService.getTaskByListId(this.currentListId)
      .subscribe((data: Task[]) => {
        this.tasks = data;
      });
  }

  onSubmitTask(inputName: any){
    const task = {
      taskName: inputName,
      done: false,
      listId: this.currentListId
    };
    console.log(task);

    this.taskService.addTask(task)
      .subscribe((data: Task) => {
        console.log('POST request is successful', data);
        this.tasks.push(data);
      }, error => console.error(error));
  }

  deleteTask(task) {
    let index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
    this.taskService.deleteTask(task.id)
      .subscribe(() => console.log('DELETE is successful'), error => console.error(error));
  }

  saveEdit(editTaskField, task) {
    if (editTaskField === ' ' || editTaskField.length < 1) {
      console.log('field must be not empty');
    }
    else {
      task.taskName = editTaskField;
      let editedTask = {
        taskName: editTaskField,
        done: task.done,
        listId: task.listId
      };
      this.taskService.putTask(task.id, editedTask)
        .subscribe((data: Task) => {
          console.log('PUT is successful', data);
        }, error => console.error(error));
    }
  }

  isCompleted(isDone, task) {
    let completedTask;
    if(isDone){
      completedTask = {
        taskName: task.taskName,
        done: true,
        listId: task.listId,
        id: task.id
      };
    }
    else{
      completedTask = {
        taskName: task.taskName,
        done: false,
        listId: task.listId,
        id: task.id
      };
    }
    let index = this.tasks.indexOf(task);
    this.tasks[index] = completedTask;

    this.taskService.putTask(task.id, completedTask)
      .subscribe((data: Task) => console.log('PUT is successful', data), error => console.error(error));
  }

}
