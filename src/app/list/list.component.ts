import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ListServiceService} from "../services/list-service.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl']
})
export class ListComponent implements OnInit {

  @Input() list;
  @Input() lists;
  @Input() currentListId;

  isDelete;

  @Output() onDelete = new EventEmitter();

  constructor(private listService: ListServiceService) {}

  ngOnInit() {
  }

  deleteList($event, listId: any) {

    this.isDelete = true;

    this.onDelete.emit(true);

    $event.preventDefault();
    this.lists.forEach((element, index) => {
      if (element.id === listId) {
        this.lists.splice(index, 1);

        this.listService.deleteList(element.id)
          .subscribe(() => console.log('DELETE is successful'), error => console.error(error));
      }
    });
  }

}
