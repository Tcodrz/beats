import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

export type BeatChannelNameKey = string;

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private isPlaying$ = new BehaviorSubject<boolean>(false);

  public isPlaying(): Observable<boolean> {
    return this.isPlaying$.asObservable();
  }

  public play(): void {
    this.isPlaying$.next(true);
  }

  public stop() {
    this.isPlaying$.next(false);
  }
}
