import {Component, Input} from "@angular/core";
import {Icons} from "../icon/icons-enum";
import {ButtonBase} from "../button/button-base.directive";

@Component({
  selector: 'beats-ui-icon-button',
  template: '',
  standalone: true
})
export class IconButtonComponentMock extends ButtonBase {
  @Input() icon: Icons;
}
