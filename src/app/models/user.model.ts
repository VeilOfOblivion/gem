export class User {
  constructor(public id: string, public firstname: string, public lastname: string, public email: string, public username: string, public isPrivate: boolean = false, public friends: string[] = []) {}
}

