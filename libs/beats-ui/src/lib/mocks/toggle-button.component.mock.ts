import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'beats-ui-toggle-button',
  template: '',
  standalone: true
})
export class ToggleButtonComponentMock {
  @Input() isActive: boolean = false;
  @Output() stateChange = new EventEmitter<boolean>();
  @Input() text: string;

  public onClick(): void {
    this.isActive = !this.isActive;
    this.stateChange.emit(this.isActive);
  }
}
