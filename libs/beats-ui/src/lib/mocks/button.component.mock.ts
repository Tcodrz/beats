import {Component, Input} from "@angular/core";
import {ButtonColor, ButtonSize, Icons} from "@beats/beats-ui";
import {ButtonBase} from "../button/button-base.directive";

@Component({selector: 'beats-ui-round-icon-button', template: '', standalone: true})
export class RoundIconButtonComponentMock extends ButtonBase {
  @Input() icon: Icons;
  @Input() size: ButtonSize;
}
