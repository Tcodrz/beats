import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Icons} from "../icon/icons-enum";
import {ButtonBase} from "../button/button-base.directive";
import {ButtonSize} from "../button/button-types";


@Component({
  selector: 'beats-ui-round-icon-button',
  templateUrl: './round-icon-button.component.html',
  styleUrls: ['./round-icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoundIconButtonComponent extends ButtonBase {
  @Input() icon: Icons;
  @Input() size: ButtonSize = ButtonSize.small;
  public readonly buttonSize = ButtonSize;
}
