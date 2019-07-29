import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {List} from "../../../list";

import {ListServiceService} from "../../../services/list-service.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {BehaviorSubject, Observable, Subject, combineLatest, fromEvent, timer, of} from "rxjs";
import {
  debounce,
  debounceTime, distinctUntilChanged,
  filter,
  find, findIndex,
  map,
  scan,
  switchMap,
  tap,
  throttleTime,
  withLatestFrom
} from "rxjs/operators";
import {el} from "@angular/platform-browser/testing/src/browser_util";


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

  currentListId;
  currentListName;
  isListDelete;
  isListChosen;
  isFirstLoad = true;

  selectedList$: Observable<List>;
  activeList$: Observable<List>;
  lists$: Observable<List[]>;

  actions$: Subject<ListAction> = new BehaviorSubject(lists => lists);

  listId;

  @Output() getListData = new EventEmitter();

  constructor(private listService: ListServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let listId$ =  this.route.paramMap.pipe(map(p => +p.get('id')));
    listId$.subscribe(data => this.listId = data);
    this.lists$ = this.listService.getLists()
      .pipe(
        switchMap((lists) => {
          return this.actions$.pipe(
            scan<ListAction, List[]>(applyAction, lists)
          )
        }),
      );

    this.activeList$ = combineLatest(listId$, this.lists$)
      .pipe(map(([id, lists]) => lists.find(l => l.id == id)));

    this.selectedList$ = this.activeList$;

    this.lists$.subscribe(data => {
      if(data.some(list => list.id == this.listId)) {
        this.chooseList({'id': this.listId, 'listName': data.find(list => list.id == this.listId).listName});
      }
      else {
        console.log('list not found');
      }
    });

    let keydownEvent =  fromEvent(document, 'keydown').pipe(
      filter((event: KeyboardEvent) => event.key == 'ArrowUp' || event.key == 'ArrowDown')
    );
    keydownEvent.pipe(
      throttleTime(200),
      withLatestFrom(this.selectedList$, this.lists$),
      map(this.changeListWithArrow)
    ).subscribe(list => this.router.navigate([`/todolist/${list.id}`]));
  }


  onSubmitList(inputName: any){
    this.listService.addList({ listName: inputName }).pipe(
        map(list => lists => [...lists, list])
      ).subscribe( action => this.actions$.next(action));
  }

  chooseList(list: List) {
    this.isFirstLoad = false;
    this.isListDelete = false;
    this.isListChosen = true;

    this.getListData.emit({
      'list':{
        'listId': list.id,
        'listName': list.listName,
      },
      'isListChosen': this.isListChosen,
      'isListDelete': this.isListDelete,
      'isFirstLoad': this.isFirstLoad
    });
  }

  deleteList(list){
    event.stopPropagation();
    this.listService.deleteList(list.id)
      .pipe(map(_ => lists => {
        let index = lists.indexOf(list);
        lists.splice(index, 1);
        return lists;
      }))
      .subscribe(action => this.actions$.next(action));
    this.isListChosen = false;
    this.isListDelete = true;

    this.getListData.emit({
      list:{
        'listId': list.id,
        'listName': list.listName,
      },
      'isListChosen': this.isListChosen,
      'isListDelete': this.isListDelete,
      'isFirstLoad': this.isFirstLoad
    });
  }

  changeListWithArrow = ([event, currentList, lists]) => {
    if (event.key == 'ArrowDown') {
      return this.nextList(lists, currentList);
    }
    else if(event.key == 'ArrowUp'){
      return this.previousList(lists, currentList);
    }
  };

  nextList(lists, currentList) {
    let index = lists.findIndex(list => list.id == currentList.id);
    if (index == lists.length - 1) {
      this.chooseList(lists[0]);
      return lists[0];
    }
    else {
      this.chooseList(lists[index + 1]);
      return lists[index + 1];
    }
  }
  previousList(lists, currentList) {
    let index = lists.findIndex(list => list.id == currentList.id);
    if(index == 0){
      this.chooseList(lists[lists.length - 1]);
      return lists[lists.length - 1];
    }
    else{
      this.chooseList(lists[index - 1]);
      return lists[index - 1];
    }
  }
}
