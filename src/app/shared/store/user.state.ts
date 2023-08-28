import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { User, UserDataService } from "src/app/user-data.service";
import { UserAction } from "./user.action";
import { tap, finalize } from "rxjs";

export class UserStateModel {
  currentUser?: User
  isLoggedIn?: boolean;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    currentUser: undefined,
    isLoggedIn: false,
  }
})
@Injectable()
export class UserState {
  constructor(private userDataService: UserDataService) {}

  @Action(UserAction.Signup)
  signup(ctx: StateContext<UserStateModel>, action: UserAction.Signup) {
    return this.userDataService.signup(action.userSignup).pipe(
      tap(data => {
        ctx.patchState({
          currentUser: data as User,
          isLoggedIn: true
        });
      }),
    );
  }

  @Action(UserAction.Logout)
  logout(ctx: StateContext<UserStateModel>, action: UserAction.Logout) {
    return this.userDataService.logout().pipe(
      tap(data => {
        ctx.patchState({
          currentUser: undefined,
          isLoggedIn: false
        });
      }),
    );
  }

  @Selector()
  static currentUser(state: UserStateModel) {
    return state.currentUser;
  }

  @Selector()
  static isLoggedIn(state: UserStateModel) {
    return state.isLoggedIn;
  }
}
