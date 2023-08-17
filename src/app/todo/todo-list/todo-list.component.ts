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
  subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(this.dataService.getTodoCategoryList().subscribe(data => {
      this.todoCategoryList = data;
      this.isLoading = false;
    }));
  }

  delete(todo: Todo) {
    this.subscription.add(this.dataService.deleteTodo(todo).subscribe());
    window.location.reload();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

