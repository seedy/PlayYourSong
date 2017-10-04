import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[pysPlayerHost]'
})
export class PlayerHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
