import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonType, Icons} from "@beats/beats-ui";

@Component({
  selector: 'beats-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  public readonly icons = Icons;
  public readonly buttonTypes = ButtonType;

  @Input() muteActive: boolean;
  @Input() soloActive: boolean;

  @Output() addClicked = new EventEmitter();
  @Output() muteClicked = new EventEmitter();
  @Output() soloClicked = new EventEmitter();

}
