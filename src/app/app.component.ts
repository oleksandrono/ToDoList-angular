import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {


  title = 'ToDoList App Angular';

  lists = [];
  tasks = [];

  currentListId;

  addList($event, inputListName: HTMLInputElement) {
    $event.preventDefault();

    if(inputListName.value===' ' || inputListName.value.length<1){
      console.log('field must be not empty');
    }
    else{
      let idList = [];
      if(this.lists.length>0){
        this.lists.forEach((element, index) => {
          idList.push(element.listId);
        });
      }
      let listId = 1;
      if (this.lists.length == 0) {
        listId = 1;
      }
      else if (this.lists.length > 0) {
        for (let i = 1; i <= this.lists.length; i++) {
          listId = Math.max.apply(null, idList)+1;
        }
      }

      let list = {
        'listName': inputListName.value,
        'listId': listId
      };
      this.lists.push(list);
      inputListName.value = '';
    }
  }

  chooseList(listId: any, listName: any) {
    this.currentListId = listId;
    document.getElementById('listName').innerText = `, in ${listName}.`;
    document.getElementById('task-container').style.display = 'block';
    document.getElementById('tasksHint').style.display = 'none';
  }

  addTask($event, inputTaskName: HTMLInputElement) {
    $event.preventDefault();

    if(inputTaskName.value===' ' || inputTaskName.value.length<1){
      console.log('field must be not empty');
    }
    else{
      let idList = [];
      if(this.tasks.length>0){
        this.tasks.forEach((element, index) => {
          idList.push(element.taskId);
        });
      }
      let taskId = 1;
      if (this.tasks.length == 0) {
        taskId = 1;
      }
      else if (this.tasks.length > 0) {
        for (let i = 1; i <= this.tasks.length; i++) {
          taskId = Math.max.apply(null, idList)+1;
        }
      }


      let task = {
        'taskName': inputTaskName.value,
        'done': false,
        'listId': this.currentListId,
        'taskId': taskId
      };
      this.tasks.push(task);
      inputTaskName.value = '';

    }
  }

}
