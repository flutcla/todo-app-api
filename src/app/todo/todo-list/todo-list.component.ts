import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { Todo, TodoCategory } from 'src/app/data.service';
import { TodoCategoryState } from 'src/app/shared/store/todo.state';
import { TodoAction } from 'src/app/shared/store/todo.action';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})

export class TodoListComponent implements OnInit {
  @Select(TodoCategoryState.todoCategories) todoCategories$?: Observable<TodoCategory[]>
  @Select(TodoCategoryState.isLoading) isLoading$?: Observable<boolean>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getTodoCategories();
  }

  getTodoCategories(): void {
    this.store.dispatch(new TodoAction.GetAll());
  }

  delete(todo: Todo) {
    this.store.dispatch(new TodoAction.Delete(todo))
  }
}

