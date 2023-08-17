import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { TodoCategory } from "src/app/data.service";
import { TodoAction } from "./todo.action";
import { DataService } from "src/app/data.service";
import { tap, finalize } from "rxjs";

export class TodoCategoryStateModel {
  todoCategories?: TodoCategory[];
  selectedTodo?: TodoCategory;
  isLoading?: boolean;
}

@State<TodoCategoryStateModel>({
  name: 'todoCategories',
  defaults: {
    todoCategories: [],
    selectedTodo: undefined,
    isLoading: false,
  },
})

@Injectable()
export class TodoCategoryState {
  constructor(private dataService: DataService) {}

  @Action(TodoAction.GetAll)
  getTodoAll(ctx: StateContext<TodoCategoryStateModel>) {
    ctx.patchState({ isLoading: true });
    return this.dataService.getTodoCategoryList().pipe(
      tap(data => {
        ctx.patchState({ todoCategories: data });
      }),
      finalize(() => {
        ctx.patchState({ isLoading: false });
      })
    );
  }

  @Action(TodoAction.Get)
  getTodo(ctx: StateContext<TodoCategoryStateModel>, action: TodoAction.Get) {
    return this.dataService.getTodoCategory(action.id).pipe(
      tap(data => {
        ctx.patchState({ selectedTodo: data });
      })
    );
  }

  @Action(TodoAction.Add)
  addTodo(ctx: StateContext<TodoCategoryStateModel>, action: TodoAction.Add) {
    return this.dataService.storeTodo(action.todoStore).pipe(
      tap(data => {
        ctx.dispatch(new TodoAction.GetAll());
      })
    );
  }

  @Action(TodoAction.Delete)
  deleteTodo(ctx: StateContext<TodoCategoryStateModel>, action: TodoAction.Delete) {
    return this.dataService.deleteTodo(action.todo).pipe(
      finalize(() => {
        ctx.dispatch(new TodoAction.GetAll())
      })
    );
  }

  @Action(TodoAction.Update)
  updateTodo(ctx: StateContext<TodoCategoryStateModel>, action: TodoAction.Update) {
    return this.dataService.updateTodo(action.todoUpdate).pipe(
      finalize(() => {
        ctx.dispatch(new TodoAction.GetAll())
      })
    );
  }

  @Selector()
  static todoCategories(state: TodoCategoryStateModel) {
    return state.todoCategories;
  }

  @Selector()
  static selectedTodo(state: TodoCategoryStateModel) {
    return state.selectedTodo;
  }

  @Selector()
  static isLoading(state: TodoCategoryStateModel) {
    return state.isLoading;
  }
}
