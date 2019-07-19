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

  getListData(listData: any){
    this.currentListId = listData.currentListId;
    this.currentListName = listData.currentListName;
    this.isListChosen = listData.isListChosen;
    this.isListDelete = listData.isListDelete;
    this.isFirstLoad = listData.isFirstLoad;
  }


}
