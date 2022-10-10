import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector:'beats-toolbar',
  template: '',
  standalone: true
})
export class ToolbarComponentMock {
  @Input() muteActive: boolean;
  @Input() soloActive: boolean;

  @Output() addClicked = new EventEmitter();
  @Output() muteClicked = new EventEmitter();
  @Output() soloClicked = new EventEmitter();
}
