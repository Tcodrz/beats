import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, Observable, Subscription} from "rxjs";

const SECONDS_IN_MINUTE = 60;
const BEATS_IN_BAR = 4;
const MILLISECONDS_IN_MINUTE = SECONDS_IN_MINUTE * 1000;
export const INITIAL_COUNTER = 1;

@Injectable({
  providedIn: 'root'
})
export class BpmService {

  private bpm$: BehaviorSubject<number> = new BehaviorSubject<number>(INITIAL_COUNTER);
  private _interval: number;
  private intervalSubscription: Subscription;
  private _counter = INITIAL_COUNTER;

  get interval(): number {
    return this._interval;
  }

  public setBpm(beats: number): void {
    this.reset();
    this._interval = 1000 / (beats / SECONDS_IN_MINUTE);
  }

  public getBpm(): Observable<number> {

    this.intervalSubscription = interval(Math.round(this._interval / BEATS_IN_BAR))
      .subscribe(() => {
        const beats = MILLISECONDS_IN_MINUTE / this._interval;
        this._counter = this._counter === beats ? 1 : (this._counter + 1);
        this.bpm$.next(this._counter);
      });
    return this.bpm$.asObservable();
  }

  stop(): void {
    if(this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  public reset(): void {
    this.stop();
    this._counter = 1;
  }

}
