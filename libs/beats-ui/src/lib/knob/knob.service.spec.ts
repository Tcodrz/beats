import {TestBed} from '@angular/core/testing';
import {KnobService, TO_DEG_MULTIPLIER} from './knob.service';

describe('KnobService', () => {
  let service: KnobService;
  let divMock: HTMLDivElement;
  let initialValue: number;
  let offsetValue: number;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KnobService]
    });
    service = TestBed.inject(KnobService);
    divMock = document.createElement('div');
    initialValue = 70;
    offsetValue = 45;
    service.initListeners(initialValue, offsetValue, divMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should call setKnobValue with (value + (event.movementY * -1)) when mousemove event listener is called', () => {
    const setKnobSpy = jest.spyOn(service, 'setKnobValue');
    const movement = 1;
    service['mouseMoveListenerFn']({movementY: movement} as MouseEvent);
    expect(setKnobSpy).toHaveBeenCalledWith(initialValue + (movement * -1), offsetValue, divMock, 1);
  });

  it('Should call document.removeEventListener when mouseup event listener is called', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    service['mouseUpListenerFn']({} as MouseEvent);
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
  });

  describe('onMouseClick()', () => {
    it('Should call document.addEventListener', () => {
      const spy = jest.spyOn(document, 'addEventListener');
      service.onMouseClick();
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  describe('setKnobValue()', () => {
    it('Should set the knobElement transform value to the value provided when offset is 0', () => {
      const degreeValue = 10 * TO_DEG_MULTIPLIER;
      service.setKnobValue(degreeValue, 0, divMock, 1);
      expect(divMock.style.transform).toEqual('rotate(36deg)');
    });
    it('Should set the knobElement transform value to 315 when called with value 360 and offset 45', () => {
      service.setKnobValue(360, 45, divMock, 1);
      expect(divMock.style.transform).toEqual('rotate(315deg)');
    });
    it('Should set the knobElement transform value to 45 when called with value 0 and offset 45', () => {
      service.setKnobValue(0, 45, divMock, 1);
      expect(divMock.style.transform).toEqual('rotate(45deg)');
    });
    it('Should set the knob transform to the offset value when called with a value smaller than the offset value', () => {
      const offset = 45;
      service.setKnobValue(0, offset, divMock, 1);
      expect(divMock.style.transform).toEqual(`rotate(${offset}deg)`);
    });
    it('Should set the knob transform to (360 - offset) when called with a value grater than 360', () => {
      const offset = 45;
      service.setKnobValue(361, offset, divMock, 1);
      expect(divMock.style.transform).toEqual(`rotate(${360 - offset}deg)`);
    });
    it('Should set the knob transition value to the animationLength provided divided by 10', () => {
      service.setKnobValue(0, 45, divMock, 3);
      expect(divMock.style.transition).toEqual('all 0.3s');
    });
  });
});
