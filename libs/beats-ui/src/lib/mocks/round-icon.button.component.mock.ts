import {Component, Input} from "@angular/core";
import {ButtonBase} from "../button/button-base.directive";
import {Icons} from "../icon/icons-enum";
import {ButtonSize} from "../button/button-types";

@Component({selector: 'beats-ui-round-icon-button', template: '', standalone: true})
export class RoundIconButtonComponentMock extends ButtonBase {
  @Input() icon: Icons;
  @Input() size: ButtonSize;
}
