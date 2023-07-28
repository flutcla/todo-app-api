import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService, Category } from 'src/app/data.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  isLoading: boolean;

  constructor(private dataService: DataService) {
    this.isLoading = true;
  }

  categoryList: Category[] = [];
  subscription = new Subscription();


  ngOnInit(): void {
    this.subscription.add(this.dataService.getCategoryList().subscribe(data => {
      this.categoryList = data;
      this.isLoading = false;
    }));
  }

  delete(category: Category) {
    this.subscription.add(this.dataService.deleteCategory(category).subscribe());
    window.location.reload();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
