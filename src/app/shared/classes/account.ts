export class Account {
  static emailRegexp(): RegExp {
    return /^[^@]+@[^.]+\..+$/;
  }

  static usernameRegexp(): RegExp {
    return /^[a-zA-Z0-9._-]*$/;
  }

  static usernameOrEmailRegexp(): RegExp {
    const username = new RegExp(this.usernameRegexp());
    const email = new RegExp(this.emailRegexp());
    return new RegExp(username.source + '|' + email.source);
  }

  constructor(
    public password: string,
    public username: string,
    public email: string,
    public id?: string
) {};


}
