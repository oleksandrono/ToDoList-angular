import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../../../task";
import {TaskServiceService} from "../../../services/task-service.service";
import {map, scan, switchMap, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, combineLatest, Observable, Subject} from "rxjs";

interface TaskAction {
  (tasks: Task[]): Task[]
}

const applyAction = (tasks, action) => action(tasks);

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.styl']
})
export class TaskContainerComponent implements OnInit {

  tasks$: Observable<Task[]>;
  private listId$: Observable<number>;
  listId;

  actions$: Subject<TaskAction> = new BehaviorSubject(tasks => tasks);

  constructor(
    private taskService: TaskServiceService,
    private route: ActivatedRoute
    ) {
  }

  ngOnInit() {
    this.listId$ =  this.route.paramMap.pipe(map(p => +p.get('id')));
    let tasks$ = combineLatest(this.listId$, this.taskService.getTasks())
      .pipe(map(([id, tasks]) => tasks.filter(t => t.listId === id)));
    this.listId$.subscribe(data => this.listId = data);

    this.tasks$ = tasks$
      .pipe(
        switchMap((tasks) => {
          return this.actions$.pipe(
            scan<TaskAction, Task[]>(applyAction, tasks)
          )
        }),
      );
  }

  onSubmitTask(inputName: string) {
    const task = {
      taskName: inputName,
      done: false,
      listId: this.listId
    };
    this.taskService.addTask(task)
      .pipe(
        map(task => tasks => [...tasks, task])
      )
      .subscribe(action => this.actions$.next(action));
    /*      .pipe(
            map(task => tasks => [...tasks, task])
          )
          .subscribe( action => {this.actions$.next(action)});*/
  }
}
