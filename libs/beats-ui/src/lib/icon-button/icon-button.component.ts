import {Component, Input} from '@angular/core';
import {ButtonBase} from "../button/button-base.directive";
import {Icons} from "../icon/icons-enum";

@Component({
  selector: 'beats-ui-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent extends ButtonBase {
  @Input() icon: Icons;
}
