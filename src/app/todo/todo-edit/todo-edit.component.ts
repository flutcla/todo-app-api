import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category, DataService, TodoCategory, STATUS, Todo, TodoEdit } from 'src/app/data.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent {
  id?: number;
  subscription = new Subscription();
  todoCategory?: TodoCategory;
  categoryList: Category[] = [];
  errorMessage?: String;
  status = STATUS;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private builder: FormBuilder,
    private router: Router,
  ) {}

  form = this.builder.group({
    categoryId: ['', Validators.required],
    title: ['', Validators.required],
    body: [''],
    state: ['', Validators.required]
  })

  ngOnInit(): void {
    this.subscription.add(
      this.route.params.subscribe(params => {
        this.id = Number(params['id']);
      })
    );

    this.subscription.add(
      this.dataService.getCategoryList().subscribe(data => {
        this.categoryList = data;
      })
    );

    this.subscription.add(
      this.dataService.getTodoCategoryList().subscribe(data => {
        this.todoCategory = data.find(elem => elem.todo.id == this.id);
        console.log(this.todoCategory)
        if(this.todoCategory != undefined){
          this.form.setValue({
            categoryId: String(this.todoCategory.todo.categoryId),
            title: String(this.todoCategory.todo.title),
            body: String(this.todoCategory.todo.body),
            state: String(this.todoCategory.todo.state.code)
          });
        }
      })
    );
  }

  onSubmit(): void {
    const formData = this.form.value;
    console.log(formData)
    if (this.form.valid){
      const todoData: TodoEdit = {
        id: this.id!,
        categoryId: Number(formData.categoryId!),
        title: formData.title!,
        body: formData.body ?? "",
        state: Number(formData.state),
      }
      this.subscription.add(
        this.dataService.updateTodo(todoData).subscribe({
          next: (_) => {
            this.router.navigate(['todo/list']);
          },
          error: (e) => {
            this.errorMessage = e.message;
          }
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
