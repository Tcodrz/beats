import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Icons} from "./icons-enum";

@Component({
  selector: 'beats-ui-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input() icon: Icons;
  @Input() color: 'primary' | 'accent' | 'warn';
}
