export type ChannelID = number;

export interface Channel {
  id: ChannelID;
  name: string;
  beats: [Bar, Bar, Bar, Bar];
  audioData?: string;
  volume: number;
  mute?: boolean;
  solo?: boolean;
}

export interface Beat {
  on: boolean;
  channelIds?: ChannelID[];
}

export type Bar = [Beat, Beat, Beat, Beat];
