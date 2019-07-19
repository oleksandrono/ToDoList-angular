import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskContainerComponent} from "./task-container/task-container.component";
import {TaskComponent} from "./task/task.component";
import {CommonsModuleModule} from "../../commons-module/commons-module.module";

@NgModule({
  declarations: [
    TaskContainerComponent,
    TaskComponent
  ],
  imports: [
    CommonsModuleModule,
    CommonModule
  ],
  exports: [
    TaskContainerComponent
  ]
})
export class TaskModuleModule { }
