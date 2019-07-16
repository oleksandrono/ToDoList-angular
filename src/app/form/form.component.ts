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

      //__________________fix here
      /*inputName.style.borderColor = '#ff0007';
      setTimeout(()=>inputName.style.borderColor = '#ced4da', 1000);*/
      //__________________fix here

    }
    else{
      this.inputNotValid = false;

      this.onSubmit.emit(inputName.value);
      inputName.value = '';
    }

  }

}
