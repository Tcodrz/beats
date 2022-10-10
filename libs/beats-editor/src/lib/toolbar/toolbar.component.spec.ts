import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import {ButtonComponentMock, ToggleButtonComponentMock} from "@beats/beats-ui";
import {By} from "@angular/platform-browser";

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent,
      ],
      imports: [
        ButtonComponentMock,
        ToggleButtonComponentMock
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should emit addClicked event when add button is clicked', () => {
    const addButton = fixture.debugElement.query(By.css('.add-button'));
    const addClickedSpy = jest.spyOn(component.addClicked, 'emit');
    addButton.componentInstance.clicked.emit();
    expect(addClickedSpy).toHaveBeenCalled();
  });


  it('Should emit muteClicked event when mute button is clicked', () => {
    const muteButton = fixture.debugElement.query(By.css('.mute-button'));
    const muteClickedSpy = jest.spyOn(component.muteClicked, 'emit');
    muteButton.componentInstance.clicked.emit();
    expect(muteClickedSpy).toHaveBeenCalled();
  });

  it('Should emit soloClicked event when solo button is clicked', () => {
    const soloButton = fixture.debugElement.query(By.css('.solo-button'));
    const soloClickedSpy = jest.spyOn(component.soloClicked, 'emit');
    soloButton.componentInstance.clicked.emit();
    expect(soloClickedSpy).toHaveBeenCalled();
  });
});
