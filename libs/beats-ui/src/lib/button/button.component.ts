import {Component, Input} from '@angular/core';
import {ButtonBase} from "./button-base.directive";
import {ButtonType} from "./button-types";
import {Icons} from "../icon/icons-enum";

@Component({
  selector: 'beats-ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent extends ButtonBase {
  @Input() text: string;
  @Input() icon: Icons;
 public readonly buttonTypes = ButtonType;
}
