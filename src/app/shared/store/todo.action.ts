// 参考 https://qiita.com/aqlwah/items/c947ed3aa74625854ea9
import { Todo, TodoEdit, TodoStore } from "src/app/data.service";

export namespace TodoAction {
  export class Add {
    static readonly type = '[Todo] Add'
    constructor(public todoStore: TodoStore) {}
  }

  export class Delete {
    static readonly type = '[Todo] Delete'
    constructor(public todo: Todo) {}
  }

  export class Update {
    static readonly type = '[Todo] Update'
    constructor(public todoUpdate: TodoEdit) {}
  }

  export class Get {
    static readonly type = '[Todo] Get'
    constructor(public id: number) {}
  }

  export class GetAll {
    static readonly type = '[Todo] GetAll'
  }
}
