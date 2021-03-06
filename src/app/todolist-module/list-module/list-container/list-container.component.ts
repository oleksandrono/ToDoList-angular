import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {List} from "../../../list";

import {ListServiceService} from "../../../services/list-service.service";
import {ActivatedRoute} from "@angular/router";
import {error} from "util";

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

  listRouteId;

  @Output() getListData = new EventEmitter();

  constructor(private listService: ListServiceService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.listRouteId = this.route.snapshot.paramMap.get('id');

    this.listService.getLists()
      .subscribe((data: List[]) => {
        this.lists = data;
        if(this.lists.some(list => list.id == this.listRouteId)){
          this.chooseList(this.listRouteId, this.lists.find(list => list.id == this.listRouteId).listName);
        }
        else {
          console.log('list not found');
        }
      });
  }

  onSubmitList(inputName: any){
    const list = {
      listName: inputName
    };

    this.listService.addList(list)
      .subscribe((data: List) => {
        console.log('POST request is successful', data);
        this.lists.push(data);
      }, error => console.error(error));
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

  deleteList($event, listId){
    this.isListDelete = true;

    this.lists.forEach((element, index) => {
      if (element.id === listId) {
        this.lists.splice(index, 1);

        this.listService.deleteList(element.id)
          .subscribe(() => console.log('DELETE is successful'), error => console.error(error));
      }
    });

    this.isListDelete = true;
    this.isListChosen = false;
    this.getListData.emit({
      'isListChosen': this.isListChosen,
      'isListDelete': this.isListDelete
    });
  }

}
