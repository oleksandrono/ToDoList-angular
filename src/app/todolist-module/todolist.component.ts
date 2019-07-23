import { Component, OnInit } from '@angular/core';
import {List} from "../list";

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.styl']
})
export class TodolistComponent implements OnInit {

  title = 'Todo List App';
  private list: List;

  constructor() { }

  ngOnInit(): void {
  }

  onSelectList(list: List){
    this.list = list;
  }


}
