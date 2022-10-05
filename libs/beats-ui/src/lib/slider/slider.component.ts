import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MatSliderChange} from "@angular/material/slider";
import {Icons} from "../icon/icons-enum";
import {SliderConfig} from "./slider-config.interface";

export const DEFAULT_STEP = 1;
export const DEFAULT_MAX_VALUE = 100;
export const DEFAULT_MIN_VALUE = 0;

@Component({
  selector: 'beats-ui-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent {
  public value: number;
  public readonly icons = Icons;

  @Output() sliderChange = new EventEmitter<number>();

  @Input('value') set setValue(amount: number) {
    this.value = amount;
  }

  @Input() stepSize: number = DEFAULT_STEP;

  @Input() min: number = DEFAULT_MIN_VALUE;

  @Input() max: number = DEFAULT_MAX_VALUE;

  @Input() showAddSubIcons: boolean = false;

  @Input() showSlider: boolean = true;

  @Input() set sliderConfig(config: SliderConfig) {
    for (const [key, value] of Object.entries(config)) {
      if (typeof config[key] !== 'undefined') {
        this[key] = value;
      }
    }
  }

  public onSliderChange(event: MatSliderChange): void {
    this.value = event.value;
    this.emitEvent();
  }

  public onSubtract(): void {
    this.value-= this.stepSize;
    this.emitEvent();
  }

  public onAdd(): void {
    this.value+= this.stepSize;
    this.emitEvent();
  }

  private emitEvent(): void {
    this.sliderChange.emit(this.value);
  }
}
