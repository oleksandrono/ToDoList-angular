import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

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

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  deleteList($event, listId: any) {

    this.isDelete = true;

    this.onDelete.emit(true);

    $event.preventDefault();
    this.lists.forEach((element, index) => {
      if (element.id === listId) {
        this.lists.splice(index, 1);

        this.http.delete(`http://localhost:3000/lists/${element.id}`, this.httpOptions)
          .subscribe(() => console.log('DELETE is successful'), error => console.error(error));
      }
    });
  }

}
