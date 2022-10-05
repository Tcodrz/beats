import {Directive, EventEmitter, Input, Output} from "@angular/core";
import {ButtonColor, ButtonType} from "./button-types";

@Directive()
export class ButtonBase {
  @Input() type: ButtonType;
  @Input() color: ButtonColor;
  @Output() clicked = new EventEmitter();
}
