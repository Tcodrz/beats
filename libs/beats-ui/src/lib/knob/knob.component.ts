import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef, EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {DOCUMENT} from "@angular/common";

export const MAX_CIRCLE_DEG = 360;
export const MIN_CIRCLE_DEG = 0;
export const TO_DEG_MULTIPLIER = 3.6;
export const DEFAULT_VALUE = 70;

@Component({
  selector: 'beats-ui-knob',
  templateUrl: './knob.component.html',
  styleUrls: ['./knob.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KnobComponent implements AfterViewInit {
  @Input('value') set setValue(value: number) {
    this.normalizedValue = value;
    this.value = value * TO_DEG_MULTIPLIER;
    this.ngAfterViewInit();
  }
  @Output() valueChange = new EventEmitter<number>();
  @ViewChild('knob', {static: true}) knob: ElementRef<HTMLDivElement>;

  private value;
  private normalizedValue;
  private mouseMoveListenerFn: (e) => void;
  private mouseUpListenerFn: (e) => void;

  constructor(
    @Inject(DOCUMENT)
    private document: Document
  ) {
    this.normalizedValue = DEFAULT_VALUE;
    this.value = this.normalizedValue * TO_DEG_MULTIPLIER;
  }

  ngAfterViewInit(): void {
    this.knob.nativeElement.style.transform = `rotate(${this.value}deg)`;
  }

  public onChange(): void {
    this.mouseUpListenerFn = (e: MouseEvent): void => {
      this.onMouseUp();
    }

    this.mouseMoveListenerFn = (e: MouseEvent): void => {
      this.value += (e.movementY * -1);
      if (this.value > MAX_CIRCLE_DEG) this.value = MAX_CIRCLE_DEG;
      if (this.value < MIN_CIRCLE_DEG) this.value = MIN_CIRCLE_DEG;
      this.normalizedValue = Math.round(this.value / TO_DEG_MULTIPLIER);
      this.knob.nativeElement.style.transform = `rotate(${this.value}deg)`;
    }
    this.document.addEventListener('mousemove', this.mouseMoveListenerFn);
    this.document.addEventListener('mouseup', this.mouseUpListenerFn);
  }

  public onMouseUp(): void {
    this.valueChange.emit(this.normalizedValue);
    this.document.removeEventListener('mousemove', this.mouseMoveListenerFn);
    this.document.removeEventListener('mouseup', this.mouseUpListenerFn);
  }
}
