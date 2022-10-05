import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleButtonComponent } from './toggle-button.component';
import {MatButtonModule} from "@angular/material/button";

describe('ToggleButtonComponent', () => {
  let component: ToggleButtonComponent;
  let fixture: ComponentFixture<ToggleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToggleButtonComponent],
      imports: [MatButtonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClick()', () => {
    it('Should set isActive to true when isActive is false', () => {
      component.isActive = false;
      component.onClick();
      expect(component.isActive).toBe(true);
    });
    it('Should set isActive to false when isActive is true', () => {
      component.isActive = true;
      component.onClick();
      expect(component.isActive).toBe(false);
    });
    it('Should emit state change event with isActive value', () => {
      component.isActive = false;
      const stateChangeSpy = jest.spyOn(component.stateChange, 'emit');
      component.onClick();
      expect(stateChangeSpy).toHaveBeenCalledWith(true);
    });
  });
});
