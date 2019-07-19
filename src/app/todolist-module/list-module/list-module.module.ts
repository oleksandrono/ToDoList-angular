import { NgModule } from '@angular/core';
import {ListContainerComponent} from "./list-container/list-container.component";
import {ListComponent} from "./list/list.component";
import {CommonsModuleModule} from "../../commons-module/commons-module.module";
import {CommonModule} from "@angular/common";
import {AppRoutingModule} from "../../app-routing.module";

@NgModule({
  declarations: [
    ListContainerComponent,
    ListComponent
  ],
  imports: [
    CommonsModuleModule,
    CommonModule,
    AppRoutingModule
  ],
  exports:[
    ListContainerComponent
  ]
})
export class ListModuleModule { }
