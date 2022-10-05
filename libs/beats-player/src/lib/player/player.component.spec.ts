import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DEFAULT_BPM, PlayerComponent} from './player.component';
import {BpmService} from './bpm.service';
import {BpmServiceMock, getBpmServiceMock} from '../mocks/bpm-service-mock';
import {PlayerService} from './player.service';
import {getPlayerServiceMock, PlayerServiceMock} from '../mocks/player-service-mock';
import {BeatsSliderComponentMock, RoundIconButtonComponentMock} from "@beats/beats-ui";


describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;
  let bpmServiceMock: BpmServiceMock;
  let playerServiceMock: PlayerServiceMock;

  beforeEach(async () => {

    bpmServiceMock = getBpmServiceMock();

    playerServiceMock = getPlayerServiceMock();

    await TestBed.configureTestingModule({
      declarations: [
        PlayerComponent,
      ],
      imports: [
        RoundIconButtonComponentMock,
        BeatsSliderComponentMock
      ],
      providers: [
        {provide: BpmService, useFactory: () => bpmServiceMock},
        {provide: PlayerService, useFactory: () => playerServiceMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('Should initialize the bpmSliderConfig', () => {
      expect(component.bpmSliderConfig).toBeTruthy();
    });
    it('Should call bpmService.setBpm with the default BPM', () => {
      expect(bpmServiceMock.setBpm).toHaveBeenCalledWith(DEFAULT_BPM);
    });
  });

  describe('onClickPlay()', () => {
    describe('When isPlaying true', () => {
      beforeEach(() => {
        component.isPlaying = true;
        component.onClickPlay();
      });
      it('Should call playerService.stop', () => {
        expect(playerServiceMock.stop).toHaveBeenCalled();
      });
      it('Should set isPlaying false', () => {
        expect(component.isPlaying).toBe(false);
      });
    });
    describe('When isPlaying false', () => {
      beforeEach(() => {
        component.isPlaying = false;
        component.onClickPlay();
      });
      it('Should call playerService.play', () => {
        expect(playerServiceMock.play).toHaveBeenCalled();
      });
      it('Should set isPlaying true', () => {
        expect(component.isPlaying).toBe(true);
      });
    });
  });

  describe('onBpmChanged()', () => {
    beforeEach(() => {
      component.onBpmChanged(2);
    });
    it('Should set the bpm to be twice the value provided', () => {
      expect(component.bpm).toBe(4);
    });
    it('Should set isPlaying to false', () => {
      expect(component.isPlaying).toBe(false);
    });
    it('Should call bpmService.setBpm with the bpm value', () => {
      expect(bpmServiceMock.setBpm).toHaveBeenCalledWith(4);
    });
  });
});
