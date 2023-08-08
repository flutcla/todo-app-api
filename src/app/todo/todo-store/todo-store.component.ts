import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Category, Todo, TodoStore } from 'src/app/data.service';
import { Store, Select } from '@ngxs/store';
import { TodoCategoryState } from 'src/app/shared/store/todo.state';
import { CategoryState } from 'src/app/shared/store/category.state';
import { CategoryAction } from 'src/app/shared/store/category.action';
import { TodoAction } from 'src/app/shared/store/todo.action';

@Component({
  selector: 'app-todo-store',
  templateUrl: './todo-store.component.html',
  styleUrls: ['./todo-store.component.scss']
})
export class TodoStoreComponent implements OnInit {
  @Select(CategoryState.categories) categories$?: Observable<Category[]>
  subs = new Subscription();

  constructor(
    private store: Store,
    private builder: FormBuilder,
    private router: Router
  ) {}

  form = this.builder.group({
    categoryId: [null, Validators.required],
    title: [null, Validators.required],
    body: ['']
  });

  errorMessage = null;

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.store.dispatch(new CategoryAction.GetAll());
  }

  onSubmit(): void {
    const formData = this.form.value;
    if (this.form.valid){
      const todoStoreData: TodoStore = {
        categoryId: Number(formData.categoryId!),
        title: formData.title!,
        body: formData.body ?? ""
      }
      this.subs.add(this.store.dispatch(new TodoAction.Add(todoStoreData)).subscribe({
          next: (_) => {
            this.router.navigate(['todo/list']);
          },
          error: (e) => {
            this.errorMessage = e.message;
          }
      }));
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
