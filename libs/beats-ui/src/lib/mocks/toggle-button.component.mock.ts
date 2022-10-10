import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ButtonBase} from "../button/button-base.directive";

@Component({
  selector: 'beats-ui-toggle-button',
  template: '',
  standalone: true
})
export class ToggleButtonComponentMock extends ButtonBase{
  @Input() isActive: boolean = false;
  @Output() stateChange = new EventEmitter<boolean>();
  @Input() text: string;

  public onClick(): void {
    this.isActive = !this.isActive;
    this.stateChange.emit(this.isActive);
  }
}
