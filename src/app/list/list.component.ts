import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl']
})
export class ListComponent implements OnInit {

  @Input() list;
  @Input() lists;
  @Input() currentListId;



  constructor() { }

  ngOnInit() {
  }


  deleteList($event, listId: any) {
    $event.preventDefault();
    this.lists.forEach((element, index) => {
      if (element.listId === listId) {
        this.lists.splice(index, 1);
        document.getElementById('list' + element.listId).remove();

        document.getElementById('task-container').style.display = 'none';
        document.getElementById('tasksHint').style.display = 'block';
        document.getElementById('listName').style.visibility = 'hidden';
      }
    });
  }

}
