import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TodolistComponent } from './todolist/todolist.component';
import { ListComponent } from './list/list.component';
import { TaskComponent } from './task/task.component';
import {FormsModule} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './form/form.component';
import { ListContainerComponent } from './list-container/list-container.component';
import { TaskContainerComponent } from './task-container/task-container.component';

import {TaskServiceService} from "./services/task-service.service";
import {ListServiceService} from "./services/list-service.service";
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    TaskComponent,
    FormComponent,
    ListContainerComponent,
    TaskContainerComponent,
    HomePageComponent,
    TodolistComponent,
    PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [

  ],
  providers: [
    ListServiceService,
    TaskServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
