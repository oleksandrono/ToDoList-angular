import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.styl']
})
export class TodolistComponent implements OnInit {

  title = 'Todo List App';

  currentListId;
  currentListName;
  isListDelete;
  isListChosen;
  isFirstLoad = true;

  constructor() { }

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
