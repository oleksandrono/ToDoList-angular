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

  getCurrentListId(_currentListId: any){
    this.currentListId = _currentListId;
  }
  getCurrentListName(_currentListName: any){
    this.currentListName = _currentListName;
  }
  getIsListChosen(_isListChosen: boolean){
    this.isListChosen = _isListChosen;
  }
  getIsListDelete(_isListDelete: boolean){
    this.isListDelete = _isListDelete;
  }
  getIsFirstLoad(_isFirsLoad: boolean){
    this.isFirstLoad = _isFirsLoad;
  }

}
