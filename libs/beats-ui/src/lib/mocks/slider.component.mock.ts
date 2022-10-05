import {Component, EventEmitter, Input, Output} from "@angular/core";
import {SliderConfig} from "@beats/beats-ui";

@Component({selector: 'beats-ui-slider', template: '', standalone: true})
export class BeatsSliderComponentMock {
  @Input() sliderConfig: SliderConfig;
  @Output() sliderChange = new EventEmitter();
}
