import { NgModule } from '@angular/core';
import {TaskModuleModule} from "./task-module/task-module.module";
import {ListModuleModule} from "./list-module/list-module.module";

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
