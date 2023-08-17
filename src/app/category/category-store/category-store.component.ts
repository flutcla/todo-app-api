import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryStore } from 'src/app/data.service';
import { Color } from '@angular-material-components/color-picker';
import { Store } from '@ngxs/store';
import { CategoryAction } from 'src/app/shared/store/category.action';

@Component({
  selector: 'app-category-store',
  templateUrl: './category-store.component.html',
  styleUrls: ['./category-store.component.scss'],
})
export class CategoryStoreComponent {
  subs = new Subscription();

  constructor(
    private store: Store,
    private builder: FormBuilder,
    private router: Router
  ) {}

  form = this.builder.group({
    name: new FormControl<string|null>(null, [Validators.required]),
    slug: new FormControl<string|null>(null, [Validators.required]),
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
      this.subs.add(this.store.dispatch(new CategoryAction.Add(categoryStoreData)).subscribe({
        next: (_) => {
          this.router.navigate(['category/list']);
        },
        error: (e) => {
          this.errorMessage = e.message;
        }
      }));
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
