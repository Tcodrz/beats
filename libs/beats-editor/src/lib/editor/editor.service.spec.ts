import {TestBed} from '@angular/core/testing';
import {EditorService} from './editor.service';
import {EditorApiService} from "./editor-api.service";
import {getEditorApiServiceMock} from "../mocks/editor-api.service.mock";
import {channelsMock} from "./editor-data.mock";
import {
  BpmService,
  BpmServiceMock,
  getBpmServiceMock,
  getPlayerServiceMock,
  PlayerService,
  PlayerServiceMock
} from "@beats/beats-player";

describe('EditorService', () => {
  let service: EditorService;
  let editorApiServiceMock: Partial<EditorApiService>;
  let bpmServiceMock: BpmServiceMock;
  let playerServiceMock: PlayerServiceMock

  beforeEach(() => {

    editorApiServiceMock = getEditorApiServiceMock();
    bpmServiceMock = getBpmServiceMock();
    playerServiceMock = getPlayerServiceMock();

    TestBed.configureTestingModule({
      providers: [
        { provide: EditorApiService, useValue: editorApiServiceMock },
        { provide: BpmService, useValue: bpmServiceMock },
        { provide: PlayerService, useValue: playerServiceMock }
      ]
    });
    service = TestBed.inject(EditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should subscribe to playerService.isPlaying', () => {
    expect(playerServiceMock.isPlaying).toHaveBeenCalled();
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
    it('Should set all channels solo true when called with true value', () =>{
      service.toggleAllChannelSolo(true);
      expect(service.getChannelsValue().every(c => c.solo)).toBe(true);
    });
    it('Should set all channels solo false when called with false value', () =>{
      service.toggleAllChannelSolo(false);
      expect(service.getChannelsValue().every(c => c.solo)).toBe(false);
    });
  });

  describe('toggleAllChannelMute()', () => {
    it('Should set all channels mute true when called with true value', () => {
      service.toggleAllChannelMute(true);
      expect(service.getChannelsValue().every(c => c.mute)).toBe(true);
    });
    it('Should set all channels mute false when called with false value', () => {
      service.toggleAllChannelMute(false);
      expect(service.getChannelsValue().every(c => c.mute)).toBe(false);
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
