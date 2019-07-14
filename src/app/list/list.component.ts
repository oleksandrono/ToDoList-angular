import {Component, Input, OnInit} from '@angular/core';

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

}
