import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryStore, DataService } from 'src/app/data.service';
import { Color } from '@angular-material-components/color-picker';

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
    name: ["", Validators.required],
    slug: ["", Validators.required],
    color: new FormControl(new Color(255, 255, 255), [Validators.required])
  });

  errorMessage?: String

  touchUi = false;
  color = undefined;

  onSubmit(): void {
    const formData = this.form.value;
    if (this.form.valid) {
      const categoryStoreData: CategoryStore = {
        name: formData.name!,
        slug: formData.slug!,
        color: formData.color!.hex
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
