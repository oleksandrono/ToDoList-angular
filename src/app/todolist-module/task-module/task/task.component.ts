import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.styl']
})
export class TaskComponent implements OnInit {

  @Input() task;
  @Input() currentListId;

  isEdit;
  isChecked;
  editTaskField;

  @Output() deleteATask = new EventEmitter();
  @Output() saveAEdit = new EventEmitter();
  @Output() isTaskCompleted = new EventEmitter();

  constructor() {}

  ngOnInit() {
    if(this.task.done){
      this.isChecked = true;
    }
    else if(!this.task.done){
      this.isChecked = false;
    }
  }

  deleteTask(task){
    this.deleteATask.emit(task);
  }

  editTask() {
    this.isEdit = true;
    this.editTaskField = this.task.taskName;
  }

  saveEdit(task) {
    if(task.taskName === this.editTaskField){
      this.cancelEdit();
    }
    else{
      this.saveAEdit.emit(this.editTaskField);
      this.isEdit = false;
    }
  }

  cancelEdit() {
    this.isEdit = false;
  }

  isCompleted($event) {
    if ($event.target.checked) {
      this.isTaskCompleted.emit(true);
      this.isChecked = true;
    }
    else{
      this.isTaskCompleted.emit(false);
      this.isChecked = false;
    }

  }
}
