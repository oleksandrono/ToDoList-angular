import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {List} from "../list";
import {HttpClient, HttpHeaders} from "@angular/common/http";

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

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  @Output() getListData = new EventEmitter();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:3000/lists').subscribe((data: List[]) => {
      this.lists = data;
    });
  }


  onSubmitList(inputName: string){
    let idList = [];
    if (this.lists.length > 0) {
      this.lists.forEach((element, index) => {
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


    this.http.post('http://localhost:3000/lists', list, this.httpOptions)
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

  }

  onDelete(value: boolean) {
    this.isListDelete = value;
    this.isListChosen = false;

    this.getListData.emit({
      'isListChosen': this.isListChosen,
      'isListDelete': this.isListDelete
    });

  }

}
