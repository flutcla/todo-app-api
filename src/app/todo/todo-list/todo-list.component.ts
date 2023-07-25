import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Todo, TodoCategory } from 'src/app/data.service';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})

export class TodoListComponent {
  constructor(private dataService: DataService) {}

  todoCategoryList: TodoCategory[] = [];
  todoCategorySubs?: Subscription;

  ngOnInit(): void {
    this.todoCategorySubs = this.dataService.getTodoCategoryList().subscribe(data => {
      this.todoCategoryList = data;
    });
  }

  delete(todo: Todo) {
    this.dataService.deleteTodo(todo).subscribe();
    window.location.reload();
  }

  ngOnDestroy(): void {
    this.todoCategorySubs?.unsubscribe();
  }
}

