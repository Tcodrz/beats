import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private isPlaying$ = new ReplaySubject<boolean>(1);

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
