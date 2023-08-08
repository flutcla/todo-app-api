import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoStoreComponent } from './todo/todo-store/todo-store.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'todo/list' },
  { path: 'todo/list', component: TodoListComponent },
  { path: 'todo/store', component: TodoStoreComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
