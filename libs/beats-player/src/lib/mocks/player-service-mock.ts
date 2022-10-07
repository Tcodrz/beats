import {PlayerService} from "../player/player.service";
import {fn, Mock} from 'jest-mock';
import {Observable, of} from "rxjs";


export type PlayerServiceMock = Partial<Record<keyof PlayerService, Mock>>;

export function getPlayerServiceMock(): PlayerServiceMock {
  return {
    stop: fn(),
    play: fn(),
    isPlaying: fn(() => {
      return new Observable(observer => {
        observer.next(false);

        setTimeout(() => {
          observer.next(true);
        }, 100);
      })
    }),
  }
}
