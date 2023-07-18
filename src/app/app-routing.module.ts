import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo/todo-list/todo-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'todo/list' },
  { path: 'todo/list', component: TodoListComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
