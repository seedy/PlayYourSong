import {Component, OnInit, Input} from '@angular/core';
import {ButtonState} from "../../classes/button-state";
import {CircularList} from "../../classes/circular-list";



@Component({
  selector: 'pys-multistate-button',
  templateUrl: 'multistate-button.component.html',
  styleUrls: ['multistate-button.component.scss']
})
export class MultistateButtonComponent implements OnInit {

  state: ButtonState;
  private buttonStates = new CircularList<ButtonState>();

  constructor() { }

  ngOnInit() {
    this.state = this.buttonStates.getSelected();
  }

  @Input() set states(states: Object[]) {
    states
      .map(this.mapState)
      .forEach((btnState) => this.buttonStates.push(btnState));
  }

  toggleState(): void{
    this.state = this.buttonStates.next();
  }

  private mapState(state: {tooltip?: string, icon?: string, themeColor?: string}): ButtonState{
    return new ButtonState(state.tooltip, state.icon, state.themeColor);
  }

}
