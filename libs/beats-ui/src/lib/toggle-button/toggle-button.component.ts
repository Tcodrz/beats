import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonBase} from "../button/button-base.directive";

@Component({
  selector: 'beats-ui-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleButtonComponent extends ButtonBase {
  @Input() isActive = false;
  @Input() text: string;
  @Output() stateChange = new EventEmitter<boolean>();

  public onClick(): void {
    this.isActive = !this.isActive;
    this.stateChange.emit(this.isActive);
  }
}
