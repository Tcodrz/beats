import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {BpmService, INITIAL_COUNTER} from './bpm.service';

describe('BpmService', () => {
  let service: BpmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BpmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('interval', () => {
    it('Should be undefined when service initialized', () => {
      expect(service.interval).toBeUndefined();
    });
    it('Should return the 500 when setBpm is called with 120', () => {
      service.setBpm(120);
      expect(service.interval).toBe(500);
    });
  });

  describe('getNumberOfBars()', () => {
    it('Should return the numberOfBars', () => {
      service.setBpm(120, 1);
      const numberOfBars = service.getNumberOfBars();
      expect(numberOfBars).toEqual(1);
    });
  });

  describe('getBpm()', () => {
    beforeEach(() => {
      service.setBpm(120);
    });

    it('Should return the bpm subject with value increasing every interval', fakeAsync(() => {
      jest.useFakeTimers();
      let bpm;
      service.getBpm().subscribe(value => {
        bpm = value;
      });
      expect(bpm).toBe(INITIAL_COUNTER);
      tick(550);
      jest.runOnlyPendingTimers();
      expect(bpm).toBe(INITIAL_COUNTER + 1);
    }));
  });

  describe('reset()', () => {
    it('Should call stop()', () => {
      const stopSpy = jest.spyOn(service, 'stop');
      service.reset();
      expect(stopSpy).toHaveBeenCalled();
    });
    it('Should reset the counter to 0', () => {
      service.reset();
      expect(service['_counter']).toBe(0);
    });
  });
});
