import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
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



  constructor(private http: HttpClient) {}

  ngOnInit() {
  }


  deleteList($event, listId: any) {
    $event.preventDefault();
    this.lists.forEach((element, index) => {
      if (element.id === listId) {
        this.lists.splice(index, 1);
        document.getElementById('list' + element.id).remove();

        document.getElementById('task-container').style.display = 'none';
        document.getElementById('tasksHint').style.display = 'block';
        document.getElementById('listNameText').style.visibility = 'hidden';

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
        };

        this.http.delete(`http://localhost:3000/lists/${element.id}`, httpOptions)
          .subscribe(() => console.log('DELETE is successful'), error => console.error(error));
      }
    });
  }

}
