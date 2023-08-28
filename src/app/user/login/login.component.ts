import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { UserAction } from 'src/app/shared/store/user.action';
import { UserLogin } from 'src/app/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private store:   Store,
    private builder: FormBuilder,
    private router:  Router
  ) {}

  subs = new Subscription();

  form = this.builder.group({
    email:    new FormControl<string | null>(null, [Validators.required]),
    password: new FormControl<string | null>(null, [Validators.required]),
  });

  errorMessage?: String

  onSubmit(): void {
    if (!this.form.valid) return;

    const formData = this.form.value;
    const loginData: UserLogin = {
      email:    formData.email!,
      password: formData.password!,
    }
    this.subs.add(
      this.store.dispatch(
        new UserAction.Login(loginData)
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
