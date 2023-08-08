import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Category } from "src/app/data.service";
import { CategoryAction } from "./category.action";
import { DataService } from "src/app/data.service";
import { tap, finalize } from "rxjs";

export class CategoryStateModel {
  categories?: Category[];
  selectedCategory?: Category;
  isLoading?: boolean;
}

@State<CategoryStateModel>({
  name: 'Categories',
  defaults: {
    categories: [],
    selectedCategory: undefined,
    isLoading: false,
  }
})

@Injectable()
export class CategoryState {
  constructor(private dataService: DataService) {}

  @Action(CategoryAction.GetAll)
  getCategoryAll(ctx: StateContext<CategoryStateModel>) {
    ctx.patchState({ isLoading: true });
    return this.dataService.getCategoryList().pipe(
      tap(data => {
        ctx.patchState({ categories: data });
      }),
      finalize(() => {
        ctx.patchState({ isLoading: false });
      })
    );
  }

  @Action(CategoryAction.Get)
  getCategory(ctx: StateContext<CategoryStateModel>, action: CategoryAction.Get) {
    return this.dataService.getCategoryList().pipe(
      tap(data => {
        ctx.patchState({ selectedCategory: data.find(x => x.id == action.id) });
      })
    );
  }

  @Action(CategoryAction.Add)
  addCategory(ctx: StateContext<CategoryStateModel>, action: CategoryAction.Add) {
    return this.dataService.storeCategory(action.categoryStore).pipe(
      tap(data => {
        ctx.dispatch(new CategoryAction.GetAll());
      })
    );
  }

  @Action(CategoryAction.Delete)
  deleteCategory(ctx: StateContext<CategoryStateModel>, action: CategoryAction.Delete) {
    return this.dataService.deleteCategory(action.category).pipe(
      finalize(() => {
        ctx.dispatch(new CategoryAction.GetAll())
      })
    );
  }

  @Action(CategoryAction.Update)
  updateCategory(ctx: StateContext<CategoryStateModel>, action: CategoryAction.Update) {
    return this.dataService.updateCategory(action.categoryUpdate).pipe(
      finalize(() => {
        ctx.dispatch(new CategoryAction.GetAll())
      })
    );
  }

  @Selector()
  static categories(state: CategoryStateModel) {
    return state.categories;
  }

  @Selector()
  static selectedCategory(state: CategoryStateModel) {
    return state.selectedCategory;
  }

  @Selector()
  static isLoading(state: CategoryStateModel) {
    return state.isLoading;
  }
}
