import {ComponentFixture, TestBed} from '@angular/core/testing';
import {KnobComponent} from './knob.component';
import {DEGREES_OFFSET, KnobService, TO_DEG_MULTIPLIER} from "./knob.service";
import {of} from "rxjs";

function getKnobServiceMock(): Partial<KnobService> {
  return {
    initListeners: jest.fn(),
    onMouseClick: jest.fn(),
    setKnobValue: jest.fn(),
    getValue: jest.fn(() => of(1))
  }
}

describe('KnobComponent', () => {
  let component: KnobComponent;
  let fixture: ComponentFixture<KnobComponent>;
  let knobServiceMock: Partial<KnobService>;
  const initialValue = 10;

  beforeEach(async () => {

    knobServiceMock = getKnobServiceMock();

    TestBed.overrideComponent(KnobComponent, {
      set: {
        providers: [
        {provide: KnobService, useValue: knobServiceMock}
        ]
      }
    })

    await TestBed.configureTestingModule({
      declarations: [KnobComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KnobComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('@Input halfCircle', () =>{
    it('Should set degreeOffset to 90 when set with true value', () => {
      component.halfCircle = true;
      fixture.detectChanges();
      expect(component['degreeOffset']).toEqual(90);
    });
  });

  describe('ngOnInit()', () => {
    let valueChangeSpy;
    beforeEach(() => {
      valueChangeSpy = jest.spyOn(component.valueChange, 'emit');
      component.setValue = initialValue;
      fixture.detectChanges();
    });
    it('Should call knobService.initListeners', () => {
      const degreesValue = initialValue * TO_DEG_MULTIPLIER;
      expect(knobServiceMock.initListeners).toHaveBeenCalledWith(degreesValue, DEGREES_OFFSET, component.knob.nativeElement);
    });
    it('Should subscribe to knobService.getValue', () => {
      expect(knobServiceMock.getValue).toHaveBeenCalled();
    });
    it('Should emit valueChange event when knobService.getValue emits a new value', () => {
      expect(valueChangeSpy).toHaveBeenCalledWith(1);
    });
  });

  describe('onMouseClick()', () => {
    it('Should call knobService.onMouseClick', () => {
      fixture.detectChanges();
      component.onMouseClick();
      expect(knobServiceMock.onMouseClick).toHaveBeenCalled();
    });
  });

});
