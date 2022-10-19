import {EditorService} from "../editor/editor.service";
import {channelsMock} from "../editor/editor-data.mock";
import {Mock, fn} from 'jest-mock';
import {of} from "rxjs";

export type EditorServiceMock = Partial<Record<keyof EditorService, Mock>>;
export const AUDIO_DATA_MOCK = 'audio data';

export function getEditorServiceMock(): EditorServiceMock {
  return {
    getChannels: fn(() => of(JSON.parse(JSON.stringify(channelsMock)))),
    getChannelsValue: fn(() => JSON.parse(JSON.stringify(channelsMock))),
    deleteChannel: fn(),
    createNewChannel: fn(),
    toggleAllChannelSolo: fn(),
    toggleAllChannelMute: fn(),
    muteChannel: fn(),
    soloChannel: fn(),
    stop: fn(),
    isPlaying: fn(() => of(true)),
    getContext: fn(() => {
      return getAudioContextMock();
    }),
    getBPM: fn(() => of(1)),
    isGlobalSoloActive: fn(() => false),
  }
}

export function getAudioContextMock(): Partial<Record<keyof AudioContext, Mock>> {

  return audioContextMock;
}


export class BufferSourceMock {
  buffer: string;
  loop: boolean;
  connect: Mock = fn(() => this);
  start = fn();
}

export class PannerMock {
  positionX = {
    setValueAtTime: fn()
  }
}

export class GainNodeMock {
  gain = {
    setValueAtTime: fn()
  }
}


class AudioContextMock {

  private bufferSourceMock = new BufferSourceMock();
  private pannerMock = new PannerMock();
  private gainNodeMock = new GainNodeMock();

  decodeAudioData = fn(() => AUDIO_DATA_MOCK);
  createBufferSource = fn(() => {
    return this.bufferSourceMock;
  });
  createGain = fn(() => {
    return this.gainNodeMock;
  });
  createPanner = fn(() => {
    return this.pannerMock;
  });
  destination = fn();
}

const audioContextMock = new AudioContextMock();
