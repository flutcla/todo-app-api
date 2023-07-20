import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})

export class TodoListComponent {
  constructor(private http: HttpClient) {}

  todoCategoryList: TodoCategory[] = [];

  API = 'http://localhost:9000/todo/list'

  ngOnInit(): void {
    this.getTodoCategoryList();
  }

  getTodoCategoryList(): void {
    this.http.get<TodoCategory[]>(this.API).subscribe(
      (response) => {
        this.todoCategoryList = response;
        return response;
      },
      (error) => {
        console.error(error);
      }
    )
  }
}

interface State {
  code: Number,
  name: String
}
interface Todo {
  id:         Number,
  categoryId: Number,
  title:      String,
  body:       String,
  state:      State
}
interface Category {
  id:    Number,
  name:  String,
  slug:  String,
  color: String
}
interface TodoCategory {
  todo: Todo,
  category: Category
}