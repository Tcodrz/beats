import {TestBed} from '@angular/core/testing';
import {EditorService} from './editor.service';
import {EditorApiService} from "./editor-api.service";
import {EditorApiServiceMock, getEditorApiServiceMock} from "../mocks/editor-api.service.mock";
import {channelsMock} from "./editor-data.mock";
import {
  BpmService,
  BpmServiceMock,
  getBpmServiceMock,
  getPlayerServiceMock,
  PlayerService,
  PlayerServiceMock
} from "@beats/beats-player";
import {of} from "rxjs";

describe('EditorService', () => {
  let service: EditorService;
  let editorApiServiceMock: EditorApiServiceMock;
  let bpmServiceMock: BpmServiceMock;
  let playerServiceMock: PlayerServiceMock

  beforeEach(() => {

    editorApiServiceMock = getEditorApiServiceMock();
    bpmServiceMock = getBpmServiceMock();
    playerServiceMock = getPlayerServiceMock();

    TestBed.configureTestingModule({
      providers: [
        {provide: EditorApiService, useValue: editorApiServiceMock},
        {provide: BpmService, useValue: bpmServiceMock},
        {provide: PlayerService, useValue: playerServiceMock}
      ]
    });
    service = TestBed.inject(EditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getChannels()', () => {
    it('Should call editorApiService.getChannels', () => {
      service.getChannels().subscribe();
      expect(editorApiServiceMock.getChannels).toHaveBeenCalled();
    });

    it('Should init channels$ subject with channels returned from api', () => {
      service.getChannels().subscribe();
      expect(service.getChannelsValue()).toEqual(channelsMock);
    });

    it('Should return the channels$ observable', () => {
      service.getChannels().subscribe(channels => {
        expect(channels).toEqual(channelsMock);
      });
    });
  });

  describe('deleteChannel()', () => {
    it('Should call editorApiService.deleteChannel', () => {
      service.deleteChannel(channelsMock[0]);
      expect(editorApiServiceMock.deleteChannel).toHaveBeenCalled();
    });
  });

  describe('createNewChannel()', () => {
    it('Should call editorApiService.addChannel with new channel', () => {
      service.createNewChannel();
      expect(editorApiServiceMock.addChannel).toHaveBeenCalled();
    });
  });

  describe('toggleAllChannelSolo()', () => {
    it('Should set all channels solo true when isGlobalSoloActive is false', () => {
      const mockChannels = channelsMock.map(c => ({...c, solo: false}));
      editorApiServiceMock.getChannels.mockImplementation(() => of(mockChannels));
      service.toggleAllChannelSolo();
      service.getChannels().subscribe(channels => {
        expect(channels.every(c => c.solo)).toBe(true);
      });
    });

    it('Should set all channels solo false when isGlobalSoloActive is true', () => {
      const mockChannels = channelsMock.map(c => ({...c, solo: true}));
      editorApiServiceMock.getChannels.mockImplementation(() => of(mockChannels));
      service.toggleAllChannelSolo();
      service.getChannels().subscribe(channels => {
        expect(channels.every(c => !c.solo)).toBe(true);
      });
    });
  });

  describe('toggleAllChannelMute()', () => {
    it('Should set all channels mute true when isGlobalMuteActive is false', () => {
      const mockChannels = channelsMock.map(c => ({...c, mute: false}));
      editorApiServiceMock.getChannels.mockImplementation(() => of(mockChannels));
      service.toggleAllChannelMute();
      service.getChannels().subscribe(channels => {
        expect(channels.every(c => c.mute)).toBe(true);
      });
    });

    it('Should set all channels mute false when isGlobalMuteActive is true', () => {
      const mockChannels = channelsMock.map(c => ({...c, mute: true}));
      editorApiServiceMock.getChannels.mockImplementation(() => of(mockChannels));
      service.toggleAllChannelMute();
      service.getChannels().subscribe(channels => {
        expect(channels.every(c => !c.mute)).toBe(true);
      });
    });
  });

  describe('muteChannel()', () => {
    it('Should set channel mute true when called with channel with mute false', () => {
      channelsMock[0].mute = false;
      service.muteChannel(channelsMock[0]);
      expect(service.getChannelsValue()[0].mute).toBe(true);
    });
    it('Should set channel mute false when called with channel with mute true', () => {
      channelsMock[0].mute = true;
      service.muteChannel(channelsMock[0]);
      expect(service.getChannelsValue()[0].mute).toBe(false);
    });
    it('Should call editorApiService.updateChannel with channel', () => {
      service.muteChannel(channelsMock[0]);
      expect(editorApiServiceMock.updateChannel).toHaveBeenCalledWith(channelsMock[0]);
    });
  });

  describe('soloChannel()', () => {
    it('Should set channel solo true when called with channel with solo false', () => {
      channelsMock[0].solo = false;
      service.soloChannel(channelsMock[0]);
      expect(service.getChannelsValue()[0].solo).toBe(true);
    });
    it('Should set channel solo true when called with channel with solo false', () => {
      channelsMock[0].solo = true;
      service.soloChannel(channelsMock[0]);
      expect(service.getChannelsValue()[0].solo).toBe(false);
    });
    it('Should call editorApiService.updateChannel with channel', () => {
      service.soloChannel(channelsMock[0]);
      expect(editorApiServiceMock.updateChannel).toHaveBeenCalledWith(channelsMock[0]);
    });
  });
});
