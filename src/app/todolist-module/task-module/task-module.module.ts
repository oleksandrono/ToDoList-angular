import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskContainerComponent} from "./task-container/task-container.component";
import {TaskComponent} from "./task/task.component";
import {CommonsModuleModule} from "../../commons-module/commons-module.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    TaskContainerComponent,
    TaskComponent
  ],
  imports: [
    CommonsModuleModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    TaskContainerComponent
  ]
})
export class TaskModuleModule { }
