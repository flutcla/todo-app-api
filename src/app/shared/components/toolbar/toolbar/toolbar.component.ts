import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { UserState } from 'src/app/shared/store/user.state';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/user-data.service';
import { CommonModule } from '@angular/common';
import { UserAction } from 'src/app/shared/store/user.action';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    CommonModule
  ]
})
export class ToolbarComponent {
  @Select(UserState.currentUser) currentUser$?: Observable<User>;
  subs = new Subscription();

  constructor(
    private store: Store,
  ) {}

  logout(): void {
    this.subs.add(
      this.store.dispatch(new UserAction.Logout()).subscribe({})
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
