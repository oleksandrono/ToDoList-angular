import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormComponent} from "./form/form.component";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {TaskModuleModule} from "../todolist-module/task-module/task-module.module";
import {ListModuleModule} from "../todolist-module/list-module/list-module.module";
import {TaskContainerComponent} from "../todolist-module/task-module/task-container/task-container.component";
import {ListContainerComponent} from "../todolist-module/list-module/list-container/list-container.component";

@NgModule({
  declarations: [
    FormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
  ],
  exports: [
    FormComponent
  ]
})
export class CommonsModuleModule { }
