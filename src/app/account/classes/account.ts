export class Account {
  static emailRegexp(): RegExp {
    return /^[^@]+@[^.]+\..+$/;
  }

  static usernameRegexp(): RegExp {
    return /^[a-zA-Z0-9._-]*$/;
  }

  constructor(
    public password: string,
    public username: string,
    public email: string,
    public id?: string
) {};


}
