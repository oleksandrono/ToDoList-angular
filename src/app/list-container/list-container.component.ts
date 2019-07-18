import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {List} from "../list";

import {ListServiceService} from "../services/list-service.service";
import {ActivatedRoute} from "@angular/router";

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


  @Output() getListData = new EventEmitter();

  constructor(private listService: ListServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.listService.getLists()
      .subscribe((data: List[]) => this.lists = data);
  }

  onSubmitList(inputName: string){
    let idList = [];
    if (this.lists.length > 0) {
      this.lists.forEach((element) => {
        idList.push(element.id);
      });
    }

    let listId = 1;
    if (this.lists.length === 0) {
      listId = 1;
    }
    else if (this.lists.length > 0) {
      for (let i = 1; i <= this.lists.length; i++) {
        listId = Math.max.apply(null, idList) + 1;
      }
    }

    const list = {
      id: listId,
      listName: inputName
    };
    this.lists.push(list);

    this.listService.addList(list)
      .subscribe(data => console.log('POST request is successful', data), error => console.error(error));
  }

  chooseList(listId: any, listName: any) {
    this.currentListId = listId;
    this.currentListName = listName;
    this.isFirstLoad = false;
    this.isListDelete = false;
    this.isListChosen = true;

    this.getListData.emit({
      'currentListId': this.currentListId,
      'currentListName': this.currentListName,
      'isListChosen': this.isListChosen,
      'isListDelete': this.isListDelete,
      'isFirstLoad': this.isFirstLoad
    });

    console.log(this.route.data);

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
