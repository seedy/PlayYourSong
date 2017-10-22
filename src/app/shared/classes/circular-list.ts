export class CircularList<E> {
  public list: E[];

  constructor(list: E[] = []) {
    this.list = list;
  }

  getSelected(): E {
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

  clear(): void {
    this.list.length = 0;
  }

  next(): E {
    if (this.list.length > 1) {
      this.list.push(this.list.shift());
    }
    return this.getSelected();
  }

  previous(): E {
    if (this.list.length > 1) {
      this.list.unshift(this.list.pop());
    }
    return this.getSelected();
  }

  select(elem: E): E {
    const target = this.list.findIndex((listElem) => listElem === elem);
    // target === -1 -> not found. target === 0 -> current element.
    // In both cases, do nothing
    if (target > 0) {
      // dichotomous reordering
      if (target < this.list.length / 2) {
        // put the smallest part, which is before target, at the end
        const before = this.list.splice(0, target);
        Array.prototype.push.apply(this.list, before);
      } else {
        // put the smallest part, which is from and after target, at start
        const after = this.list.splice(target);
        Array.prototype.unshift.apply(this.list, after);
      }
    }
    return this.getSelected();
  }

  remove(elem: E): E {
    const target = this.list.findIndex((listElem) => listElem === elem);
    if (target !== -1) {
      this.list.splice(target, 1);
    }
    return this.getSelected();
  }
}
