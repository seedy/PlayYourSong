import {Component, OnInit, Input, EventEmitter, Output, ElementRef, AfterViewInit} from '@angular/core';

import {ButtonState} from "../../classes/button-state";
import {CircularList} from "../../classes/circular-list";



@Component({
  selector: 'pys-multistate-button',
  templateUrl: 'multistate-button.component.html',
  styleUrls: ['multistate-button.component.scss']
})
export class MultistateButtonComponent implements OnInit{
  @Input() tooltipPosition : string ;
  state: ButtonState;
  private buttonStates = new CircularList<ButtonState>();

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    this.state = this.buttonStates.getSelected();
  }

  @Input() set states(states: Object[]) {
    states
      .map(this.mapState)
      .forEach((btnState) => this.buttonStates.push(btnState));
  }

  @Output() onStateChange = new EventEmitter<string>();

  toggleState(): void{
    this.state = this.buttonStates.next();
    this.onStateChange.emit(this.state.id);
  }

  private mapState(state: {id: string, tooltip?: string, icon?: string, themeColor?: string}): ButtonState{
    return new ButtonState(state.id, state.tooltip, state.icon, state.themeColor);
  }

}
