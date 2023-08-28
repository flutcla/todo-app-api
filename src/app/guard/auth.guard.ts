import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserState } from '../shared/store/user.state';
import { Subscription } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const subs = new Subscription();
  const store = inject(Store);
  const isLoggedIn = store.selectSnapshot(UserState.isLoggedIn);
  if (isLoggedIn) return true;
  router.navigate(['./login']);
  return false;
}
