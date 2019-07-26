import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {List} from "../../../list";

import {ListServiceService} from "../../../services/list-service.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {BehaviorSubject, Observable, Subject, combineLatest, fromEvent} from "rxjs";
import {find, map, scan, switchMap, tap} from "rxjs/operators";


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

  lists: List[];

  currentListId;
  currentListName;
  isListDelete;
  isListChosen;
  isFirstLoad = true;

  activeList$: Observable<List>;
  lists$: Observable<List[]>;

  actions$: Subject<ListAction> = new BehaviorSubject(lists => lists);


  @Output() getListData = new EventEmitter();

  constructor(private listService: ListServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let listId$ =  this.route.paramMap.pipe(map(p => +p.get('id')));
    let lists$ = this.listService.getLists();

    this.activeList$ = combineLatest(listId$, lists$)
      .pipe(map(([id, lists]) => lists.find(l => l.id == id)));

    this.lists$ = lists$
      .pipe(
        switchMap((lists) => {
          return this.actions$.pipe(
            scan<ListAction, List[]>(applyAction, lists)
          )
        }),
      );
    let listId;
    listId$.subscribe(data => listId = data);
    lists$.subscribe(data => {
      this.lists = data;
      if(data.some(list => list.id == listId)) {
        this.chooseList(listId, data.find(list => list.id == listId).listName);
      }
      else {
        console.log('list not found');
      }
    });

    fromEvent(document, 'keyup').subscribe((event: KeyboardEvent) => {
        if (event.key === 'ArrowUp') {
          this.lists$.subscribe(lists => {
            this.previousList(lists);
          });
        }
        if (event.key === 'ArrowDown') {
          this.lists$.subscribe(lists => {
            this.nextList(lists);
          });
        }

    });
  }

  onSubmitList(inputName: any){
    this.listService.addList({ listName: inputName })
      .pipe(
        map(list => lists => [...lists, list])
      )
      .subscribe( action => {this.actions$.next(action)});
  }

  chooseList(listId: any, listName: any) {
    this.currentListId = listId;
    this.currentListName = listName;
    this.isFirstLoad = false;
    this.isListDelete = false;
    this.isListChosen = true;

    this.getListData.emit({
      'list':{
        'listId': this.currentListId,
        'listName': this.currentListName,
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
        return lists.slice(0, index).concat(lists.slice(index + 1));
      }))
      .subscribe(
        action => {
          this.actions$.next(action);
        }
      );
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

  private changeListWithArrow(index){
    if (this.activeList$ !== undefined) {
      this.lists$.subscribe(lists => {
        if(this.isListDelete === false){
          this.router.navigate([`/todolist/${lists[index].id}`], {relativeTo: this.route}).then(r => r);
          this.chooseList(lists[index].id, lists[index].listName);
        }
        else{
          return false;
        }
      });
    }
  }

  private previousList(lists) {
    let index = lists.findIndex(list => list.id == this.currentListId);
    if (index !== 0) {
      this.changeListWithArrow(index-1);
    }
    else{
      this.changeListWithArrow(lists.length-1);
    }
  }

  private nextList(lists) {
    let index = lists.findIndex(list => list.id == this.currentListId);
    if (index < lists.length - 1) {
      this.changeListWithArrow(index + 1);
    }
    else{
      this.changeListWithArrow(0);
    }
  }
}
