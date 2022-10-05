import {BpmService} from "@beats/beats-player";
import {fn, Mock} from 'jest-mock';

export type BpmServiceMock = Partial<Record<keyof BpmService, Mock>>;

export function getBpmServiceMock(): BpmServiceMock {
  return {
    setBpm: fn()
  }
}
