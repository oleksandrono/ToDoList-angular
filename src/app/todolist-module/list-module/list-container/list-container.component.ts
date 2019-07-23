import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {List} from "../../../list";

import {ListServiceService} from "../../../services/list-service.service";
import {ActivatedRoute} from "@angular/router";
import {map, scan, switchMap, tap, multicast} from "rxjs/operators";
import {BehaviorSubject, combineLatest, Observable, Subject} from "rxjs";

interface ListAction {
  (lists: List[]): List[]
}
const applyAction = (lists, action) => action(lists);

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.styl']
})
export class ListContainerComponent implements OnInit {

  activeList$: Observable<List>;
  lists$: Observable<List[]>;

  actions$: Subject<ListAction> = new BehaviorSubject(lists => lists);

  @Output() select = new EventEmitter<List>();

  constructor(private listService: ListServiceService, private route: ActivatedRoute) { }
  ngOnInit() {
    let listId$ =  this.route.paramMap.pipe(map(p => +p.get('id')));
    let lists$ = this.listService.getLists();

    this.activeList$ = combineLatest(listId$, lists$)
      .pipe(map(([id, lists]) => lists.find(l => l.id === id) ))

    this.activeList$.subscribe(this.select);

    this.lists$ = lists$
      .pipe(
        switchMap((lists) => {
          return this.actions$.pipe(
            tap(console.log),
            scan<ListAction, List[]>(applyAction, lists)
          )
        }),
        tap(console.log)
      );
  }

  onSubmitList(listName: string){
    this.listService.addList({ listName })
      .pipe(
        map(list => lists => [...lists, list])
      )
      .subscribe( action => {this.actions$.next(action)});
  }

  deleteList(list) {
    this.listService.deleteList(list.id)
      .pipe(map(_ => lists => {
          let index = lists.indexOf(list);
          return lists.slice(0, index).concat(lists.slice(index + 1))
      }))
      .subscribe(
        action => {this.actions$.next(action)},
        (err) => {console.log('error')},
        () => {console.log('complete remove list')}
        )
  }

}
