import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Observable, Subject} from "rxjs";

export const MAX_CIRCLE_DEG = 360;
export const MIN_CIRCLE_DEG = 0;
export const TO_DEG_MULTIPLIER = 3.6;
export const DEGREES_OFFSET = 60;
export const HALF_CIRCLE_DEG_OFFSET = 90;

@Injectable()
export class KnobService {
  private mouseUpListenerFn: (e: MouseEvent) => void;
  private mouseMoveListenerFn: (e: MouseEvent) => void;
  private normalizedValue$ = new Subject<number>();

  constructor(
    @Inject(DOCUMENT)
    private document: Document
  ) {
  }

  public initListeners(degreeValue: number, offset: number, knobElement: HTMLDivElement): void {
    this.mouseUpListenerFn = (e: MouseEvent): void => {
      this.onMouseUp();
    }
    this.mouseMoveListenerFn = (e: MouseEvent): void => {
      const movement = (e.movementY * -1);
      degreeValue += movement;
      if (degreeValue >= MAX_CIRCLE_DEG) {
        degreeValue = MAX_CIRCLE_DEG;
      }
      if (degreeValue <= MIN_CIRCLE_DEG) {
        degreeValue = MIN_CIRCLE_DEG;
      }

      const normalizedValue = Math.floor(degreeValue / TO_DEG_MULTIPLIER);
      this.normalizedValue$.next(normalizedValue);
      this.setKnobValue(degreeValue, offset, knobElement, 1);
    }
  }

  public onMouseClick(): void {
    this.document.addEventListener('mousemove', this.mouseMoveListenerFn);
    this.document.addEventListener('mouseup', this.mouseUpListenerFn);
  }

  private onMouseUp(): void {
    this.document.removeEventListener('mousemove', this.mouseMoveListenerFn);
    this.document.removeEventListener('mouseup', this.mouseUpListenerFn);
  }

  public setKnobValue(degreesValue: number, offset: number, knobElement: HTMLDivElement, animationLength: 1 | 2 | 3 | 4 | 5): void {
    const maxDegreesValue = MAX_CIRCLE_DEG - (offset * 2);
    const percentageValue = degreesValue / MAX_CIRCLE_DEG;
    let res = Math.floor((maxDegreesValue * percentageValue) + offset);
    if (res >= (MAX_CIRCLE_DEG - offset)) {
      res = MAX_CIRCLE_DEG - offset;
    }

    if (res <= (MIN_CIRCLE_DEG + offset)) {
      res = MIN_CIRCLE_DEG + offset;
    }

    knobElement.style.transition = `all 0.${animationLength}s`;
    knobElement.style.transform = `rotate(${res}deg)`;
  }

  public getValue(): Observable<number> {
    return this.normalizedValue$.asObservable();
  }

}
