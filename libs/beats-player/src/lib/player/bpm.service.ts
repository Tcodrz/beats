import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, Observable, Subscription} from "rxjs";

const SECONDS_IN_MINUTE = 60;
const BEATS_IN_BAR = 4;
export const MILLISECONDS_IN_SECOND = 1000;
export const INITIAL_COUNTER = 0;

export enum NumberOfBars {
  four = 4,
  eight = 8,
  sixteen = 16,
}

@Injectable({
  providedIn: 'root'
})
export class BpmService {

  private bpm$: BehaviorSubject<number> = new BehaviorSubject<number>(INITIAL_COUNTER);
  private _interval: number;
  private intervalSubscription: Subscription;
  private _counter = INITIAL_COUNTER;
  private numberOfBars: number;

  get interval(): number {
    return this._interval;
  }

  public setBpm(beats: number, numberOfBars = NumberOfBars.four): void {
    if (this.intervalSubscription && !this.intervalSubscription.closed) {
      this.reset();
    }
    this.numberOfBars = numberOfBars;
    this._interval = MILLISECONDS_IN_SECOND / (beats / SECONDS_IN_MINUTE); // 120BPM = 1000 / (120 / 60) = 500 => one beat every 0.5 second
  }

  public getBpm(): Observable<number> {
    if (!this.intervalSubscription || this.intervalSubscription.closed) {
      this.setInterval();
    }
    return this.bpm$.asObservable();
  }

  stop(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  public reset(): void {
    this.stop();
    this._counter = INITIAL_COUNTER;
  }

  public getNumberOfBars(): number {
    return this.numberOfBars;
  }

  private setInterval() {
    this.intervalSubscription = interval(Math.floor(this._interval / BEATS_IN_BAR))
      .subscribe(() => {
        this._counter++;
        const totalBeats = this.numberOfBars * BEATS_IN_BAR;
        if (this._counter > totalBeats) {
          this._counter = 1;
        }
        this.bpm$.next(this._counter);
      });
  }
}
