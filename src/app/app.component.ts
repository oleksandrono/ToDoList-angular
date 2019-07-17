import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})

export class AppComponent implements OnInit {

  constructor() {}

  title = 'ToDoList App Angular';

  currentListId;
  currentListName;
  isListDelete;
  isListChosen;
  isFirstLoad = true;


  ngOnInit(): void {
  }

  getListData(_listData: any){
    this.currentListId = _listData.currentListId;
    this.currentListName = _listData.currentListName;
    this.isListChosen = _listData.isListChosen;
    this.isListDelete = _listData.isListDelete;
    this.isFirstLoad = _listData.isFirstLoad;
  }

}
