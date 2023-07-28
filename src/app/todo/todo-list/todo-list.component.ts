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
  constructor(private dataService: DataService) {
    this.isLoading = true;
  }

  isLoading: boolean;
  todoCategoryList: TodoCategory[] = [];
  todoCategorySubs?: Subscription;
  deleteSubs?: Subscription;

  ngOnInit(): void {
    this.todoCategorySubs = this.dataService.getTodoCategoryList().subscribe(data => {
      this.todoCategoryList = data;
      this.isLoading = false;
    });
  }

  delete(todo: Todo) {
    this.deleteSubs = this.dataService.deleteTodo(todo).subscribe();
    window.location.reload();
  }

  ngOnDestroy(): void {
    this.todoCategorySubs?.unsubscribe();
    this.deleteSubs?.unsubscribe();
  }
}

