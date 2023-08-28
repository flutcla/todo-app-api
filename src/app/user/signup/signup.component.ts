import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { UserAction } from 'src/app/shared/store/user.action';
import { UserSignup } from 'src/app/user-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(
    private store:   Store,
    private builder: FormBuilder,
    private router:  Router,
  ) {}

  subs = new Subscription();

  form = this.builder.group({
    name:     new FormControl<string | null>(null, [Validators.required]),
    email:    new FormControl<string | null>(null, [Validators.required]),
    password: new FormControl<string | null>(null, [Validators.required]),
  });

  errorMessage?: String

  onSubmit(): void {
    if (!this.form.valid) return;

    const formData = this.form.value;
    const signupData: UserSignup = {
      name:     formData.name!,
      email:    formData.email!,
      password: formData.password!,
    }
    this.subs.add(
      this.store.dispatch(
        new UserAction.Signup(signupData)
      ).subscribe({
        next: (x) => {
          this.router.navigate(['todo/list']);
        },
        error: (e) => {
          this.errorMessage = e.message;
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
