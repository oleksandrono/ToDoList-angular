import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {List} from "../../../list";

import {ListServiceService} from "../../../services/list-service.service";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, Observable, Subject, combineLatest} from "rxjs";
import {map, scan, switchMap} from "rxjs/operators";

//__add
interface ListAction {
  (lists: List[]): List[]
}
const applyAction = (lists, action) => action(lists);
//__add

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

  // listRouteId;

  //__add
  activeList$: Observable<List>;
  lists$: Observable<List[]>;

  actions$: Subject<ListAction> = new BehaviorSubject(lists => lists);
  //__add


  @Output() getListData = new EventEmitter();

  constructor(private listService: ListServiceService, private route: ActivatedRoute) { }

  ngOnInit() {

/*    this.listRouteId = this.route.snapshot.paramMap.get('id');

    this.listService.getLists()
      .subscribe((data: List[]) => {
        this.lists = data;
        if(this.lists.some(list => list.id == this.listRouteId)){
          this.chooseList(this.listRouteId, this.lists.find(list => list.id == this.listRouteId).listName);
        }
        else {
          console.log('list not found');
        }
      });*/

    //__add
    let listId$ =  this.route.paramMap.pipe(map(p => +p.get('id')));
    let lists$ = this.listService.getLists();

    this.activeList$ = combineLatest(listId$, lists$)
      .pipe(map(([id, lists]) => lists.find(l => l.id == id)));

    // this.activeList$.subscribe(this.select);

    this.lists$ = lists$
      .pipe(
        switchMap((lists) => {
          return this.actions$.pipe(
            scan<ListAction, List[]>(applyAction, lists)
          )
        }),
      );

    this.lists$.subscribe(data => this.lists = data);
    // __add

  }

  onSubmitList(inputName: any){
/*    const list = {
      listName: inputName
    };

    this.listService.addList(list)
      .subscribe((data: List) => {
        console.log('POST request is successful', data);
        this.lists.push(data);
      }, error => console.error(error));*/

    //__add
    this.listService.addList({ listName: inputName })
      .pipe(
        map(list => lists => [...lists, list])
      )
      .subscribe( action => {this.actions$.next(action)});
    //__add
  }

  isActive(listId){
    return this.currentListId == listId;
  }

  chooseList(listId: any, listName: any) {
    this.isActive(listId);

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
    this.isListDelete = true;

/*    this.lists.forEach((element, index) => {
      if (element.id === listId) {
        this.lists.splice(index, 1);

        this.listService.deleteList(element.id)
          .subscribe(() => console.log('DELETE is successful'), error => console.error(error));
      }
    });*/

    //__add
    this.listService.deleteList(list.id)
      .pipe(map(_ => lists => {
        let index = lists.indexOf(list);
        return lists.slice(0, index).concat(lists.slice(index + 1))
      }))
      .subscribe(
        action => {this.actions$.next(action)}
      );
    //__add

    this.isListDelete = true;
    this.isListChosen = false;
    this.getListData.emit({
      'isListChosen': this.isListChosen,
      'isListDelete': this.isListDelete
    });
  }

}
