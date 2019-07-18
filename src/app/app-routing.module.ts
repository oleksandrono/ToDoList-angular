import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {TodolistComponent} from "./todolist/todolist.component";
import {PagenotfoundComponent} from "./pagenotfound/pagenotfound.component";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'todolist',
    component: TodolistComponent
  },
  {
    path: '**',
    // redirectTo: ''
    component: PagenotfoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
