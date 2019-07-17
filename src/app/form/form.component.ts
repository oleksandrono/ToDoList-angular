import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.styl']
})
export class FormComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

  inputNotValid;

  @Input() name;

  @Output() onSubmit = new EventEmitter();

  add($event: Event, inputName: HTMLInputElement) {
    $event.preventDefault();

    let regExp = '^\\s*$';

    if (inputName.value.match(regExp)) {
      this.inputNotValid = true;
    }
    else{
      this.inputNotValid = false;
      this.onSubmit.emit(inputName.value);
      inputName.value = '';
    }

  }

}
