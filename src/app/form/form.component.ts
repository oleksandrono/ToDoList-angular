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

  @Input() name;

  @Output() onSubmit = new EventEmitter();

  add($event: Event, inputName: HTMLInputElement) {
    $event.preventDefault();

    if (inputName.value === ' ' || inputName.value.length < 1) {
      inputName.style.borderColor = '#ff0007';
      setTimeout(()=>inputName.style.borderColor = '#ced4da', 1000);
    }
    else{
      this.onSubmit.emit(inputName.value);
      inputName.value = '';
    }

  }

}
