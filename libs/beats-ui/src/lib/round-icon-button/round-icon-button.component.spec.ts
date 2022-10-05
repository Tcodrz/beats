import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, Input} from "@angular/core";
import {Icons} from "../icon/icons-enum";
import {RoundIconButtonComponent} from "./round-icon-button.component";
import {MatButtonModule} from "@angular/material/button";

@Component({selector: 'beats-ui-icon', template: ''})
export class IconComponentMock {
  @Input() icon: Icons;
}

describe('ButtonComponent', () => {
  let component: RoundIconButtonComponent;
  let fixture: ComponentFixture<RoundIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoundIconButtonComponent, IconComponentMock],
      imports: [MatButtonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RoundIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
