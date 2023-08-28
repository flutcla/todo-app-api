import { UserSignup } from "src/app/user-data.service";


export namespace UserAction {
  export class Signup {
    static readonly type = '[User] Signup'
    constructor(public userSignup: UserSignup) {}
  }
}
