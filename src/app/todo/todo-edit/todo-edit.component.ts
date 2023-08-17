import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Category, TodoCategory, STATUS, TodoEdit } from 'src/app/data.service';
import { Select, Store } from '@ngxs/store';
import { TodoCategoryState } from 'src/app/shared/store/todo.state';
import { CategoryState } from 'src/app/shared/store/category.state';
import { TodoAction } from 'src/app/shared/store/todo.action';
import { CategoryAction } from 'src/app/shared/store/category.action';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent {
  @Select(TodoCategoryState.selectedTodo) todoCategory$?: Observable<TodoCategory>;
  @Select(CategoryState.categories) categories$?: Observable<Category[]>;
  subs = new Subscription();
  todoCategory?: TodoCategory;
  errorMessage?: String;
  status = STATUS;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private builder: FormBuilder,
    private router: Router,
  ) {}

  form = this.builder.group({
    categoryId: new FormControl<string|null>(null, [Validators.required]),
    title: new FormControl<string|null>(null, [Validators.required]),
    body: [''],
    state: new FormControl<string|null>(null, [Validators.required]),
  })

  ngOnInit(): void {
    this.getTodoCategory();
    this.getCategories();

    if (this.todoCategory$ != undefined) {
      this.subs.add(this.todoCategory$.subscribe(todoCategory => {
        if(todoCategory == undefined) return;
        this.form.setValue({
          categoryId: String(todoCategory.todo.categoryId),
          title: String(todoCategory.todo.title),
          body: String(todoCategory.todo.body),
          state: String(todoCategory.todo.state.code)
        });
        this.todoCategory = todoCategory;
      }))
    }
  }

  getTodoCategory(): void {
    this.subs.add(
      this.route.params.subscribe(params => {
        this.store.dispatch(new TodoAction.Get(Number(params['id'])));
      })
    );
  }

  getCategories(): void {
    this.store.dispatch(new CategoryAction.GetAll());
  }

  onSubmit(): void {
    const formData = this.form.value;
    if (this.form.valid){
      const todoData: TodoEdit = {
        id: this.todoCategory!.todo.id,
        categoryId: Number(formData.categoryId),
        title: formData.title!,
        body: formData.body ?? "",
        state: Number(formData.state),
      }
      this.subs.add(this.store.dispatch(new TodoAction.Update(todoData)).subscribe({
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
