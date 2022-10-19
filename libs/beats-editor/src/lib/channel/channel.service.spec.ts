import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ChannelService} from './channel.service';
import {
  AUDIO_DATA_MOCK,
  BufferSourceMock,
  EditorServiceMock, GainNodeMock,
  getAudioContextMock,
  getEditorServiceMock,
  PannerMock
} from "../mocks/editor-service.mock";
import {EditorService} from "../editor/editor.service";
import {channelsMock} from "../editor/editor-data.mock";
import {Bar, Channel} from '@beats/api-interfaces';

const bar: Bar = [{on: false}, {on: false}, {on: false}, {on: false}];

describe('ChannelService', () => {
  let service: ChannelService;
  let editorServiceMock: EditorServiceMock;
  let channelMock: Channel;

  beforeEach(() => {

    editorServiceMock = getEditorServiceMock();

    TestBed.configureTestingModule({
      providers: [
        ChannelService,
        {provide: EditorService, useValue: editorServiceMock}
      ]
    });

    service = TestBed.inject(ChannelService);
    channelMock = Object.assign({}, channelsMock[0]);
    service.setChannel(channelMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should initialize set channel value', () => {
    expect(service.getChannel()).toEqual(channelMock);
  });

  describe('addAudioBufferDataToChannel()', () => {
    it('Should set channel.audioBufferData', fakeAsync(() => {
      global.fetch = jest.fn(() => Promise.resolve({
        arrayBuffer: () => Promise.resolve()
      })) as any;
      service.addAudioBufferDataToChannel(channelMock);
      tick();
      expect(channelMock.audioBufferData).toEqual(AUDIO_DATA_MOCK);
    }));
  });

  describe('playOnce()', () => {
    it('Should call AudioContext.start', () => {
      const bufferSourceMock: BufferSourceMock = getAudioContextMock().createBufferSource() as BufferSourceMock;
      service.playOnce(channelMock);
      expect(bufferSourceMock.start).toHaveBeenCalled();
    });
    it('Should set source pan value with channel.panValue', () => {
      const pannerMock: PannerMock = getAudioContextMock().createPanner() as PannerMock;
      channelMock.panValue = -1;
      service.playOnce(channelMock);
      expect(pannerMock.positionX.setValueAtTime).toHaveBeenCalledWith(-1, 0);
    });
    it('Should set source volume to channel volume', () => {
      const gainNodeMock: GainNodeMock = getAudioContextMock().createGain() as GainNodeMock;
      channelMock.volume = 0.2;
      service.playOnce(channelMock);
      expect(gainNodeMock.gain.setValueAtTime).toHaveBeenCalledWith(0.2, 0);
    });
  });

  describe('play()', () => {
    let playOnceSpy: jest.SpyInstance;

    beforeEach(() => {
      playOnceSpy = jest.spyOn(service, 'playOnce');
    });

    it('Should call editorService.getBpm', () => {
      service.play();
      expect(editorServiceMock.getBPM).toHaveBeenCalled();
    });

    it('Should call playOnce with channel when channel next beat is on and globalSolo is not active', () => {
      service.setChannel({
        ...channelMock,
        beats: [[{on: true}, {on: false}, {on: false}, {on: false},], bar, bar, bar]
      });
      editorServiceMock.isGlobalSoloActive.mockImplementation(() => false);
      service.play();
      expect(playOnceSpy).toHaveBeenCalled();
    });

    it('Should call playOnce with channel when channel next beat is on and globalSolo is active and channel solo is true', () => {
      service.setChannel({
        ...channelMock,
        beats: [[{on: true}, {on: false}, {on: false}, {on: false},], bar, bar, bar],
        solo: true,
      });
      editorServiceMock.isGlobalSoloActive.mockImplementation(() => true);
      service.play();
      expect(playOnceSpy).toHaveBeenCalled();
    });

    it('Should not call playOnce with channel when channel next beat is off', () => {
      service.setChannel(channelMock);
      service.play();
      expect(playOnceSpy).not.toHaveBeenCalled();
    });

    it('Should not call playOnce with channel when channel next beat is on and globalSolo is active and channel solo is not active', () => {
      service.setChannel({
        ...channelMock,
        beats: [[{on: true}, {on: false}, {on: false}, {on: false}], bar, bar, bar],
        solo: true,
      });
      editorServiceMock.isGlobalSoloActive.mockImplementation(() => true);
      service.play();
      expect(playOnceSpy).toHaveBeenCalled();
    });
  });

  describe('stop()', () => {
    it('Should call editor.stop', () => {
      service.stop();
      expect(editorServiceMock.stop).toHaveBeenCalled();
    });
  });

  describe('toggleChannelSolo()', () => {
    it('Should set channel.solo true when channel.solo is false', () => {
      channelMock.solo = false;
      service.setChannel(channelMock);
      service.toggleChannelSolo();
      expect(service.getChannel().solo).toBe(true);
    });
  });

  describe('setChannelSolo()', () => {
    it('Should call editor.soloChannel with channel', () => {
      service.setChannelSolo();
      expect(editorServiceMock.soloChannel).toHaveBeenCalledWith(service.getChannel());
    });
  });

  describe('muteChannel()', () => {
    it('Should call editor.muteChannel with channel', () => {
      service.muteChannel();
      expect(editorServiceMock.muteChannel).toHaveBeenCalledWith(service.getChannel());
    });
  });

});
