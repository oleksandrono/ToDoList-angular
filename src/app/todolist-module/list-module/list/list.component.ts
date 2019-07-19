import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl']
})
export class ListComponent implements OnInit {

  @Input() list;

  @Output() deleteList = new EventEmitter();
  constructor() {}

  ngOnInit() {
  }

  onDeleteList(listId){
    this.deleteList.emit(listId);
  }

}
