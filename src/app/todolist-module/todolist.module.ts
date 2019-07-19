import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskModuleModule} from "./task-module/task-module.module";
import {ListModuleModule} from "./list-module/list-module.module";
import {TodolistComponent} from "./todolist.component";

@NgModule({
  declarations: [
  ],
  imports: [
    TaskModuleModule,
    ListModuleModule
  ],
  exports: [
    TaskModuleModule,
    ListModuleModule
  ]
})
export class TodolistModule { }
