import {BpmService} from "@beats/beats-player";
import {fn, Mock} from 'jest-mock';
import {of} from "rxjs";

export type BpmServiceMock = Partial<Record<keyof BpmService, Mock>>;

export function getBpmServiceMock(): BpmServiceMock {
  return {
    setBpm: fn(),
    getBpm: fn(() => of(120)),
  }
}
