import { ComponentFixture, TestBed } from '@angular/core/testing';
import {DEFAULT_VALUE, KnobComponent, TO_DEG_MULTIPLIER} from './knob.component';
import {By} from "@angular/platform-browser";

describe('KnobComponent', () => {
  let component: KnobComponent;
  let fixture: ComponentFixture<KnobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KnobComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KnobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should set the knob default position when no input value provided', () => {
    const value = DEFAULT_VALUE * TO_DEG_MULTIPLIER;
    const knobComponent = fixture.debugElement.query(By.css('.indicator'));
    expect(knobComponent.nativeElement.style.transform).toEqual(`rotate(${value}deg)`);
  });

  it('Should set the knob position to be the input value provided times the conversion rate to degrees', () => {
    component.setValue = 10;
    const knobElement = fixture.debugElement.query(By.css('.indicator'));
    expect(knobElement.nativeElement.style.transform).toEqual(`rotate(${36}deg)`);
  });
});
