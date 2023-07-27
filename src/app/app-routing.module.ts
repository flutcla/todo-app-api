import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoStoreComponent } from './todo/todo-store/todo-store.component';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryStoreComponent } from './category/category-store/category-store.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'todo/list' },
  { path: 'todo/list', component: TodoListComponent },
  { path: 'todo/store', component: TodoStoreComponent },
  { path: 'todo/edit/:id', component: TodoEditComponent },
  { path: 'category/list', component: CategoryListComponent },
  { path: 'category/store', component: CategoryStoreComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
