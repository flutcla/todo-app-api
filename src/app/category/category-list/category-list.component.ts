import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Category } from 'src/app/data.service';
import { CategoryAction } from 'src/app/shared/store/category.action';
import { CategoryState } from 'src/app/shared/store/category.state';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  @Select(CategoryState.categories) categories$?: Observable<Category[]>;
  @Select(CategoryState.isLoading) isLoading$?: Observable<boolean>;

  constructor(private store: Store) {}


  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.store.dispatch(new CategoryAction.GetAll());
  }

  delete(category: Category) {
    this.store.dispatch(new CategoryAction.Delete(category));
  }
}
