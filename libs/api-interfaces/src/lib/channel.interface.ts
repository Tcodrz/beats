export type ChannelID = number;

export interface Channel {
  id: ChannelID;
  name: string;
  beats: [Bar, Bar, Bar, Bar];
  fileURL?: string;
  volume: number;
  mute?: boolean;
  solo?: boolean;
  panValue: number;
  audioBufferData?: AudioBuffer;
}

export interface Beat {
  on: boolean;
  channelIds?: ChannelID[];
}

export type Bar = [Beat, Beat, Beat, Beat];
