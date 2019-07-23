import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../../../task";
import {TaskServiceService} from "../../../services/task-service.service";
import {map, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {combineLatest, Observable} from "rxjs";


@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.styl']
})
export class TaskContainerComponent implements OnInit {

  tasks$: Observable<Task[]>;
  private listId$: Observable<number>;

  constructor(
    private taskService: TaskServiceService,
    private route: ActivatedRoute
    ) {
  }

  ngOnInit() {
    this.listId$ =  this.route.paramMap.pipe(map(p => +p.get('id')));
    this.tasks$ = combineLatest(this.listId$, this.taskService.getTasks())
      .pipe(map(([id, tasks]) => tasks.filter(t => t.listId === id) ))
  }

  onSubmitTask(inputName: string) {
    //   const task = {
    //     taskName: inputName,
    //     done: false,
    //     // listId: this.getListData.currentListId
    //   };
    //
    //   this.taskService.addTask(task)
    //     .subscribe((data: Task) => {
    //       console.log('POST request is successful', data);
    //       this.tasks.push(data);
    //     }, error => console.error(error));
    // }
  }
}
