import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TodolistComponent } from './todolist-module/todolist.component';

import {TaskServiceService} from "./services/task-service.service";
import {ListServiceService} from "./services/list-service.service";
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import {TodolistModule} from "./todolist-module/todolist.module";
import {CommonsModuleModule} from "./commons-module/commons-module.module";


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TodolistComponent,
    PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TodolistModule,
    CommonsModuleModule
  ],
  providers: [
    ListServiceService,
    TaskServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
