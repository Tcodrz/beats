import {Component, Input} from "@angular/core";
import {Icons} from "../icon/icons-enum";
import {ButtonBase} from "../button/button-base.directive";


@Component({
  selector: 'beats-ui-button',
  template: '',
  standalone: true
})
export class ButtonComponentMock extends ButtonBase {
  @Input() icon: Icons;
}
