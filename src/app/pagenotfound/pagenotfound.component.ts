import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.styl']
})
export class PagenotfoundComponent implements OnInit {

  link = window.location.href;

  constructor() { }

  ngOnInit() {
  }

}
