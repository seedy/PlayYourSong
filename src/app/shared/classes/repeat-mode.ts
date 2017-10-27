export class RepeatMode {

  constructor(
    public id: string,
    public tooltip: string,
    public icon: string,
    public themeColor: string
  ) {}

  public static get NONE(): string {
    return 'repeat-none';
  }

  public static get LIST(): string {
      return 'repeat-list';
  }

  public static get TRACK(): string {
      return 'repeat-track';
  }
}
