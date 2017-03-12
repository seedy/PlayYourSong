export class CircularList<E> {
  public list:E[];

  constructor(){
    this.list = [];
  }

  getSelected(): E{
    return this.list[0];
  }

  push(...elements: E[]): E {
    elements.forEach((element) => this.list.push(element));
    return this.getSelected();
  }

  unshift(...elements: E[]): E {
    elements.forEach((element) => this.list.unshift(element));
    return this.getSelected();
  }

  next(): E {
    if(this.list.length > 1){
      this.list.push(this.list.shift());
    }
    return this.getSelected();
  }

  previous(): E {
    if(this.list.length > 1){
      this.list.unshift(this.list.pop());
    }
    return this.getSelected();
  }
}
