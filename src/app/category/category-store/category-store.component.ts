import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryStore, DataService } from 'src/app/data.service';


@Component({
  selector: 'app-category-store',
  templateUrl: './category-store.component.html',
  styleUrls: ['./category-store.component.scss'],
})
export class CategoryStoreComponent {
  constructor(
    private dataService: DataService,
    private builder: FormBuilder,
    private router: Router
  ) {}

  subscription = new Subscription();

  form = this.builder.group({
    name: [null, Validators.required],
    slug: [null, Validators.required],
    color: [null, Validators.required]
  });

  errorMessage?: String

  onSubmit(): void {
    const formData = this.form.value;
    if (this.form.valid) {
      const categoryStoreData: CategoryStore = {
        name: formData.name!,
        slug: formData.slug!,
        color: formData.color!
      }
      this.subscription.add(this.dataService.storeCategory(categoryStoreData).subscribe({
        next: (_) => {
          this.router.navigate(['todo/list']);
        },
        error: (e) => {
          this.errorMessage = e.message;
        }
      }));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
