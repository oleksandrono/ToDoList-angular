import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../../../task";
import {TaskServiceService} from "../../../services/task-service.service";
import {filter} from "rxjs/operators";
import {from} from "rxjs";
import {listener} from "@angular/core/src/render3";

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.styl']
})
export class TaskContainerComponent implements OnInit {

  tasks: Task[];

  @Input() getListData;

  constructor(private taskService: TaskServiceService) {
  }

  ngOnInit() {
    this.taskService.getTasks()
      .subscribe((data: Task[]) => this.tasks = data);
  }

  onSubmitTask(inputName: string){
    const task = {
      taskName: inputName,
      done: false,
      listId: this.getListData.currentListId
    };

    this.taskService.addTask(task)
      .subscribe((data: Task) => {
        console.log('POST request is successful', data);
        this.tasks.push(data);
      }, error => console.error(error));
  }
}
