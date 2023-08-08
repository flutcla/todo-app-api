import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  BASE_URI = 'http://localhost:9000'

  getTodoCategoryList(): Observable<TodoCategory[]> {
    return this.http.get<TodoCategory[]>(`${this.BASE_URI}/todo/list`);
  }

  deleteTodo(todo: Todo) {
    return this.http.post(`${this.BASE_URI}/todo/delete`, {"id": todo.id});
  }

  getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.BASE_URI}/category/list`);
  }

  storeTodo(todoStore: TodoStore) {
    return this.http.post(`${this.BASE_URI}/todo/store`, todoStore);
  }
}

interface State {
  code: Number,
  name: String
}
export interface Todo {
  id:         Number,
  categoryId: Number,
  title:      String,
  body:       String,
  state:      State
}
export interface Category {
  id:    Number,
  name:  String,
  slug:  String,
  color: String
}
export interface TodoCategory {
  todo: Todo,
  category: Category
}

export interface TodoStore {
  categoryId: Number,
  title:      String,
  body:       String
}