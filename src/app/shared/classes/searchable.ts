export class Searchable {

  constructor(
    public name: string,
    public id: string,
    public service: any,
    public query: Function,
    public active: boolean
  ) {};

}
