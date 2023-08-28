import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Select } from '@ngxs/store';
import { UserState } from 'src/app/shared/store/user.state';
import { Observable, async } from 'rxjs';
import { User } from 'src/app/user-data.service';
import { CommonModule } from '@angular/common';

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
}
