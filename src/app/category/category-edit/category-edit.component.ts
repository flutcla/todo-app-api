import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category, DataService } from 'src/app/data.service';
import { Color } from '@angular-material-components/color-picker';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent {
  id?: number;
  subscription = new Subscription();
  category?: Category;
  errorMessage?: String;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private builder: FormBuilder,
    private router: Router,
  ) {}

  form = this.builder.group({
    name: ["", Validators.required],
    slug: ["", Validators.required],
    color: new FormControl(new Color(255, 255, 255), [Validators.required])
  });

  ngOnInit(): void {
    this.subscription.add(
      this.route.params.subscribe(params => {
        this.id = Number(params['id']);
      })
    )

    this.subscription.add(
      this.dataService.getCategoryList().subscribe(categoryList => {
        this.category = categoryList.find(elem => elem.id == this.id)
        if(this.category) {
          this.form.setValue({
            name: String(this.category.name),
            slug: String(this.category.slug),
            color: new Color(...hexToRgb(this.category.color))
          })
        }
      })
    )
  }

  onSubmit(): void {
    const formData = this.form.value;
    if(this.form.valid) {
      const categoryData: Category = {
        id: this.id!,
        name: formData.name!,
        slug: formData.slug!,
        color: formData.color!.toHex()
      }
      this.subscription.add(
        this.dataService.updateCategory(categoryData).subscribe({
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