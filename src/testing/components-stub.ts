import {Component, EventEmitter, Injectable, Type} from '@angular/core';

@Injectable()
export class ComponentsStub {
  static mockComponent(options: any): Type<{}> {
    const metadata: Component = {
      selector: options.selector,
      template: options.template || '',
      inputs: options.inputs,
      outputs: options.outputs
    };
    class MockComponent {}

    (metadata.outputs || []).forEach((method) => {
      MockComponent.prototype[method] = new EventEmitter<any>();
    });

    return Component(metadata)(MockComponent);
  }


}
