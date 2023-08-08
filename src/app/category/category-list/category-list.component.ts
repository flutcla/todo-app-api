import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService, Category } from 'src/app/data.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  constructor(private dataService: DataService) {}

  categoryList: Category[] = [];
  subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(this.dataService.getCategoryList().subscribe(data => {
      this.categoryList = data;
    }));
  }

  delete(category: Category) {
    // not yet implemented
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
