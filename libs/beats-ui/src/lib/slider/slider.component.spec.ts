import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderComponent } from './slider.component';
import {Component, Input} from "@angular/core";
import {Icons} from "../icon/icons-enum";
import {MatSlider} from "@angular/material/slider";

@Component({selector: 'beats-ui-icon', template: ''})
class IconComponentMock {
  @Input() icon: Icons;
}

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SliderComponent, IconComponentMock, MatSlider],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
