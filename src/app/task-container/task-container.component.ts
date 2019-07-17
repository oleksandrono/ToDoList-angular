import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../task";
import {TaskServiceService} from "../services/task-service.service";

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.styl']
})
export class TaskContainerComponent implements OnInit {

  tasks: Task[];

  @Input() getListData;

  constructor(private taskService: TaskServiceService) { }

  ngOnInit() {
   this.taskService.getTasks()
      .subscribe((data: Task[]) => {
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
      listId: this.getListData.currentListId
    };

    this.tasks.push(task);

    this.taskService.addTask(task)
      .subscribe(data => console.log('POST request is successful', data), error => console.error(error));
  }

}
