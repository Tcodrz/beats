import {Channel, ChannelID} from '@beats/api-interfaces';

export function generateChannelId(): ChannelID {
  return Math.round(Math.random() * 1000000000);
}

export const kickChannelMock: Channel = {
  name: 'Kick',
  volume: 0.7,
  panValue: 0,
  id: generateChannelId(),
  beats: [
    [
      {on: false},
      {on: false},
      {on: false},
      {on: false},
    ], [
      {on: false},
      {on: false},
      {on: false},
      {on: false},
    ], [
      {on: false},
      {on: false},
      {on: false},
      {on: false},
    ], [
      {on: false},
      {on: false},
      {on: false},
      {on: false},
    ],
  ]
};

export const bassChannelMock: Channel = {
  name: 'Bass',
  volume: 0.7,
  panValue: 0,
  id: generateChannelId(),
  beats: [
    [
      {on: false},
      {on: false},
      {on: false},
      {on: false},
    ], [
      {on: false},
      {on: false},
      {on: false},
      {on: false},
    ], [
      {on: false},
      {on: false},
      {on: false},
      {on: false},
    ], [
      {on: false},
      {on: false},
      {on: false},
      {on: false},
    ],
  ]
};

export const hihatChannelMock: Channel = {
  name: 'Hi-hat',
  volume: 0.7,
  panValue: 0,
  id: generateChannelId(),
  beats: [
    [
      {on: false},
      {on: false},
      {on: false},
      {on: false},
    ], [
      {on: false},
      {on: false},
      {on: false},
      {on: false},
    ], [
      {on: false},
      {on: false},
      {on: false},
      {on: false},
    ], [
      {on: false},
      {on: false},
      {on: false},
      {on: false},
    ],
  ]
};
export const snareChannelMock: Channel = {
  name: 'Snare',
  volume: 0.7,
  panValue: 0,
  id: generateChannelId(),
  beats: [
    [
      {on: false},
      {on: false},
      {on: false},
      {on: false},
    ], [
      {on: false},
      {on: false},
      {on: false},
      {on: false},
    ], [
      {on: false},
      {on: false},
      {on: false},
      {on: false},
    ], [
      {on: false},
      {on: false},
      {on: false},
      {on: false},
    ],
  ]
};

export const channelsMock: Channel[] = [
  kickChannelMock,
  bassChannelMock,
  hihatChannelMock,
  snareChannelMock
];
