import { Category, CategoryStore } from "src/app/data.service";

export namespace CategoryAction {
  export class Add {
    static readonly type = '[Category] Add'
    constructor(public categoryStore: CategoryStore) {}
  }

  export class Delete {
    static readonly type = '[Category] Delete'
    constructor(public category: Category) {}
  }

  export class Update {
    static readonly type = '[Category] Update'
    constructor(public categoryUpdate: Category) {}
  }

  export class Get {
    static readonly type = '[Category] Get'
    constructor(public id: number) {}
  }

  export class GetAll {
    static readonly type = '[Category] GetAll'
  }
}
