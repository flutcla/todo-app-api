import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/data.service';
import { Color } from '@angular-material-components/color-picker';
import { Select, Store } from '@ngxs/store';
import { CategoryState } from 'src/app/shared/store/category.state';
import { CategoryAction } from 'src/app/shared/store/category.action';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent {
  @Select(CategoryState.selectedCategory) selectedCategory$?: Observable<Category>;
  subs = new Subscription();
  category?: Category;
  errorMessage?: String;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private builder: FormBuilder,
    private router: Router,
  ) {}

  form = this.builder.group({
    name: new FormControl<string|null>(null, [Validators.required]),
    slug: new FormControl<string|null>(null, [Validators.required]),
    color: new FormControl(new Color(255, 255, 255), [Validators.required])
  });

  ngOnInit(): void {
    this.getCategory();

    if(this.selectedCategory$ != undefined) {
      this.subs.add(this.selectedCategory$.subscribe(category => {
        if(category == undefined) return;
        this.category = category;
        this.form.setValue({
          name: String(category.name),
          slug: String(category.slug),
          color: new Color(...hexToRgb(category.color))
        });
      }))
    }
  }

  getCategory(): void {
    this.subs.add(
      this.route.params.subscribe(params => {
        this.store.dispatch(new CategoryAction.Get(Number(params['id'])));
      })
    )
  }

  onSubmit(): void {
    const formData = this.form.value;
    if(this.form.valid) {
      const categoryData: Category = {
        id: this.category!.id,
        name: formData.name!,
        slug: formData.slug!,
        color: formData.color!.toHex()
      }
      this.subs.add(this.store.dispatch(new CategoryAction.Update(categoryData)).subscribe({
          next: (_) => {
            this.router.navigate(['category/list']);
          },
          error: (e) => {
            this.errorMessage = e.message;
          }
        })
      );
    }
  }
}

function hexToRgb(hex: String): [r: number, g: number, b: number] {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return [r, g, b];
}