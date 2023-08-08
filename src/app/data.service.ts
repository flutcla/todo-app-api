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
interface Category {
  id:    Number,
  name:  String,
  slug:  String,
  color: String
}
export interface TodoCategory {
  todo: Todo,
  category: Category
}