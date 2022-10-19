import {Injectable} from '@angular/core';
import {Channel} from "@beats/api-interfaces";
import {channelsMock} from "./editor-data.mock";
import {BpmService, PlayerService} from "@beats/beats-player";
import {BehaviorSubject, map, Observable, Subscription} from "rxjs";
import {EditorApiService} from "./editor-api.service";

export const PAN_MAX_VALUE = 3.4;

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private channels$: BehaviorSubject<Channel[]> = new BehaviorSubject<Channel[]>(channelsMock);
  private context: AudioContext;
  private playSubscription: Subscription;

  constructor(
    private player: PlayerService,
    private bpm: BpmService,
    private editorApiService: EditorApiService
  ) {
  }

  public getChannels(): Observable<Channel[]> {
    this.editorApiService.getChannels().subscribe(channels => {
      this.channels$.next(channels);
    });
    return this.channels$.asObservable();
  }

  public getChannelsValue(): Channel[] {
    return this.channels$.getValue();
  }

  public isPlaying(): Observable<boolean> {
    return this.player.isPlaying();
  }

  public getBPM(): Observable<number> {
    return this.bpm.getBpm();
  }

  public getContext(): AudioContext {
    if (!this.context) {
      this.context = new AudioContext();
    }
    return this.context;
  }

  public stop(): void {
    if (this.playSubscription) {
      this.playSubscription.unsubscribe();
    }
    this.bpm.stop();
    this.bpm.reset();
  }

  public getCurrentTime(): number {
    return this.context.currentTime;
  }

  public muteChannel(channel: Channel) {
    channel.mute = !channel.mute;
    const channels = this.channels$.getValue();
    channel[channels.indexOf(channel)] = channel;
    this.channels$.next(channels);
    this.editorApiService.updateChannel(channel).subscribe();
  }

  public soloChannel(channel: Channel): void {
    const channels = this.channels$.getValue();
    channel.solo = !channel.solo;
    channels[channels.indexOf(channel)] = channel;
    this.channels$.next(channels);
    this.editorApiService.updateChannel(channel).subscribe();
  }

  public toggleAllChannelSolo(): void {
    const isGlobalSoloActive = this.isGlobalSoloActive();
    const channels = this.channels$.getValue();
    for (const channel of channels) {
      channel.solo = !isGlobalSoloActive;
    }
    this.channels$.next(channels);
  }

  public toggleAllChannelMute(): void {
    const channels = this.channels$.getValue();
    const isGlobalMuteActive = this.isGlobalMuteActive();
    this.channels$.next(channels.map(c => ({...c, mute: !isGlobalMuteActive})));
  }

  public isGlobalMuteActive(): boolean {
    return this.channels$.getValue().some(c => c.mute);
  }

  public isGlobalMuteActive$(): Observable<boolean> {
    return this.channels$.asObservable()
      .pipe(
        map(channels => channels.some(c => c.mute))
      );
  }

  public isGlobalSoloActive(): boolean {
    return this.channels$.getValue().some(c => c.solo);
  }

  public isGlobalSoloActive$(): Observable<boolean> {
    return this.channels$.asObservable()
      .pipe(
        map(channels => channels.some(c => c.solo))
      );
  }

  public deleteChannel(channel: Channel): void {
    this.editorApiService.deleteChannel(channel).subscribe(channels => {
      this.channels$.next(channels);
    });
  }

  public createNewChannel(): void {
    const newChannel: Channel = {
      id: Math.round(Math.random() * 10000000),
      name: 'New Channel',
      beats: [
        [{on: false}, {on: false}, {on: false}, {on: false}],
        [{on: false}, {on: false}, {on: false}, {on: false}],
        [{on: false}, {on: false}, {on: false}, {on: false}],
        [{on: false}, {on: false}, {on: false}, {on: false}]
      ],
      volume: 0.7,
      panValue: 0,
      mute: false,
      solo: false
    };
    this.editorApiService.addChannel(newChannel)
      .subscribe((channels) => {
        this.channels$.next(channels);
      });
  }
}
