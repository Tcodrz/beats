import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {DEGREES_OFFSET, HALF_CIRCLE_DEG_OFFSET, KnobService, TO_DEG_MULTIPLIER} from "./knob.service";
import {debounceTime} from "rxjs";

@Component({
  selector: 'beats-ui-knob',
  templateUrl: './knob.component.html',
  styleUrls: ['./knob.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [KnobService]
})
export class KnobComponent implements OnInit {
  @Input('value') set setValue(value: number) {
    this.degreeValue = value * TO_DEG_MULTIPLIER;
    this.knobService.setKnobValue(this.degreeValue, this.degreeOffset, this.knob.nativeElement, 5);
  }

  @Input() set halfCircle(value: boolean) {
    this.degreeOffset = value ? HALF_CIRCLE_DEG_OFFSET : DEGREES_OFFSET;
  }

  @Output() valueChange = new EventEmitter<number>();
  @ViewChild('knob', {static: true}) knob: ElementRef<HTMLDivElement>;

  private degreeOffset = DEGREES_OFFSET;
  private degreeValue;

  constructor(
    private knobService: KnobService
  ) {
  }

  ngOnInit(): void {
    this.knobService.initListeners(this.degreeValue, this.degreeOffset, this.knob.nativeElement);
    this.knobService.getValue()
      .pipe(debounceTime(150))
      .subscribe(normalizedValue => {
        this.valueChange.emit(normalizedValue);
      });
  }

  public onMouseClick(): void {
    this.knobService.onMouseClick();
  }

}
