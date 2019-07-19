import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {element} from "protractor";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.styl']
})
export class FormComponent implements OnInit {

  inputNotValid;

  @Input() name;

  inputName;

  constructor() { }

  ngOnInit() {
  }

  @Output() onSubmit = new EventEmitter();

  add($event: Event) {
    $event.preventDefault();

    let regExp = '^\\s*$';

    if (this.inputName.match(regExp)) {
      this.inputNotValid = true;
    }
    else{
      this.inputNotValid = false;
      this.onSubmit.emit(this.inputName);
      this.inputName = '';
    }

  }

}
