import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService, Category, TodoStore } from 'src/app/data.service';

@Component({
  selector: 'app-todo-store',
  templateUrl: './todo-store.component.html',
  styleUrls: ['./todo-store.component.scss']
})
export class TodoStoreComponent {
  constructor(
    private dataService: DataService,
    private builder: FormBuilder,
    private router: Router
  ) {}

  categoryList: Category[] = [];

  form = this.builder.group({
    categoryId: [null, Validators.required],
    title: [null, Validators.required],
    body: ['']
  });

  errorMessage = null;

  ngOnInit(): void {
    this.dataService.getCategoryList().subscribe(data => {
      this.categoryList = data;
    });
  }

  onSubmit(): void {
    const formData = this.form.value;
    if (this.form.valid){
      const todoStoreData: TodoStore = {
        categoryId: Number(formData.categoryId!),
        title: formData.title!,
        body: formData.body ?? ""
      }
      this.dataService.storeTodo(todoStoreData).subscribe({
        next: (_) => {
          this.router.navigate(['todo/list']);
        },
        error: (e) => {
          this.errorMessage = e.message;
        }
      });

    }
  }
}
