import {PlayerService} from "../player/player.service";
import {fn, Mock} from 'jest-mock';


export type PlayerServiceMock = Partial<Record<keyof PlayerService, Mock>>;

export function getPlayerServiceMock(): PlayerServiceMock {
  return {
    stop: fn(),
    play: fn(),
  }
}
