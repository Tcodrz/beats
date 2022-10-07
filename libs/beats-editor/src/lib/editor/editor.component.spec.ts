import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EditorComponent} from './editor.component';
import {EditorService} from "./editor.service";
import {EditorServiceMock, getEditorServiceMock} from "../mocks/editor-service.mock";
import {PlayerComponentMock} from "../mocks/player-component.mock";
import {ChannelComponentMock} from "../mocks/channel-component.mock";
import {channelsMock} from "./editor-data.mock";
import {of} from "rxjs";
import {ButtonComponentMock, ToggleButtonComponentMock} from "@beats/beats-ui";
import {Channel} from "@beats/api-interfaces";

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let editorServiceMock: EditorServiceMock;

  beforeEach(async () => {

    editorServiceMock = getEditorServiceMock();

    await TestBed.configureTestingModule({
      declarations: [EditorComponent],
      imports: [
        ChannelComponentMock,
        PlayerComponentMock,
        ToggleButtonComponentMock,
        ButtonComponentMock
      ],
      providers: [
        {provide: EditorService, useValue: editorServiceMock},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('channels$', () => {
    it('Should call editorService.getChannels', () => {
      component.channels$.subscribe();
      expect(editorServiceMock.getChannels).toHaveBeenCalled();
    });
    it('Should set isGlobalSoloActive to false when no channels solo', () => {
      component.channels$.subscribe();
      expect(component.isGlobalSoloActive).toBe(false);
    });
    it('Should set isGlobalMuteActive to false when no channels are muted', () => {
      component.channels$.subscribe();
      expect(component.isGlobalMuteActive).toBe(false);
    });
    it('Should set isGlobalSoloActive to true when at least on channel is solo', () => {
      editorServiceMock.getChannels.mockImplementation(() => of([
        ...channelsMock,
        {
          ...channelsMock[0],
          solo: true
        },
      ]));
      component.ngOnInit();
      component.channels$.subscribe();
      expect(component.isGlobalSoloActive).toBe(true);
    });
    it('Should set isGlobalMuteActive to true when at least on channel is muted', () => {
      editorServiceMock.getChannels.mockImplementation(() => of([
        ...channelsMock,
        {
          ...channelsMock[0],
          mute: true
        },
      ]));
      component.ngOnInit();
      component.channels$.subscribe();
      expect(component.isGlobalMuteActive).toBe(true);
    });
  });

  describe('onDeleteChannel()', () => {
    it('Should call editorService.deleteChannel', () => {
      component.onDeleteChannel({} as Channel);
      expect(editorServiceMock.deleteChannel).toHaveBeenCalledWith({});
    });
  });
  describe('onAddChannel()', () => {
    it('Should call editorService.createNewChannel', () => {
      component.onAddChannel({} as Event);
      expect(editorServiceMock.createNewChannel).toHaveBeenCalled();
    });
  });

  describe('onChannelSolo()', () => {
    it('Should call editorService.soloChannel', () => {
      component.onChannelSolo({} as Channel);
      expect(editorServiceMock.soloChannel).toHaveBeenCalled();
    });
  });

  describe('onChannelMute()', () => {
    it('Should call editorService.muteChannel', () => {
      component.onChannelMute({} as Channel);
      expect(editorServiceMock.muteChannel).toHaveBeenCalledWith({});
    });
  });

  describe('toggleGlobalSolo()', () => {
    beforeEach(() => {
      component.isGlobalSoloActive = false;
      component.toggleGlobalSolo();
    });
    it('Should set isGlobalSoloActive to true when isGlobalSoloActive is false', () => {
      expect(component.isGlobalSoloActive).toBe(true);
    });
    it('Should call editorService.toggleAllChanelSolo with isGlobalSoloActive', () => {
      expect(editorServiceMock.toggleAllChannelSolo).toHaveBeenCalledWith(true);
    });
  });

  describe('toggleGlobalMute()', () => {
    beforeEach(() => {
      component.isGlobalMuteActive = false;
      component.toggleGlobalMute();
    });
    it('Should set isGlobalMuteActive to true when isGlobalMuteActive is false ', () => {
      expect(component.isGlobalMuteActive).toBe(true);
    });
    it('Should call editorService.toggleAllChannelsMute with isGlobalMuteActive', () => {
      expect(editorServiceMock.toggleAllChannelMute).toHaveBeenCalledWith(true);
    });
  });
});
