import {TestBed} from '@angular/core/testing';
import {PlayerService} from './player.service';

describe('PlayerService', () => {
  let service: PlayerService;
  let isPlaying;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerService);
  });

  beforeEach(() => {
    service.isPlaying().subscribe(value => {
      isPlaying = value;
    });
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isPlaying()', () => {
    it('Should return the isPlaying subject with initial value false', () => {
      expect(isPlaying).toBe(false);
    });
  });

  describe('play()', () => {
    it('Should set isPlaying true', () => {
      service.play();
      expect(isPlaying).toBe(true);
    });
  });

  describe('stop()', () => {
    it('Should set isPlaying false', () => {
      service.stop();
      expect(isPlaying).toBe(false);
    });
  });
});
