import {Injectable} from '@angular/core';
import {Beat, Channel} from "@beats/api-interfaces";
import {channelsMock} from "./editor-data.mock";
import {BpmService, PlayerService} from "@beats/beats-player";
import {BehaviorSubject, Observable, skip, Subscription} from "rxjs";
import {EditorApiService} from "./editor-api.service";

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private channels$: BehaviorSubject<Channel[]> = new BehaviorSubject<Channel[]>(channelsMock);

  private context: AudioContext;
  private masterChannel: GainNode;
  private playSubscription: Subscription;
  private channelBeatsAudioMap = new Map<string, MediaElementAudioSourceNode>();

  constructor(
    private player: PlayerService,
    private bpm: BpmService,
    private editorApiService: EditorApiService
  ) {
    this.subscribeToPlayer();
  }

  private subscribeToPlayer(): void {
    this.player.isPlaying()
      .pipe(skip(1))
      .subscribe(isPlaying => {
        if (isPlaying) {
          this.play();
        } else {
          this.stop();
        }
      });
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

  private play(): void {
    this.initContext();
    this.playSubscription = this.bpm.getBpm()
      .subscribe(currentBeat => {
        const hasSoloChannels = this.channels$.getValue().some(c => c.solo);
        const channels = hasSoloChannels ? this.channels$.getValue().filter(c => c.solo) : this.channels$.getValue();

        channels
          .filter(c => !c.mute)
          .forEach(channel => {
            const beat = this.getNextBeat(channel, currentBeat);
            const mapKey = `${channel.id}:${currentBeat}`;

            const audioSource = this.channelBeatsAudioMap.get(mapKey);

            if (!audioSource && channel.fileURL) {
              this.registerChannel(channel, mapKey);
            }

            if (beat.on && this.channelBeatsAudioMap.get(mapKey)) {
              this.channelBeatsAudioMap.get(mapKey).mediaElement.volume = channel.volume;
              this.channelBeatsAudioMap.get(mapKey).mediaElement.play().then();
            }

          });
      });
  }

  private registerChannel(channel: Channel, mapKey: string): void {
    const audioElement = document.createElement('audio');
    audioElement.src = channel.fileURL;
    audioElement.volume = channel.volume;
    const source = this.context.createMediaElementSource(audioElement);
    source.connect(this.masterChannel).connect(this.context.destination);
    this.channelBeatsAudioMap.set(mapKey, source);
  }

  private initContext(): void {
    if (this.context) return;
    this.context = new AudioContext();
    this.masterChannel = this.context.createGain();
    this.masterChannel.connect(this.context.destination);
  }

  private getNextBeatIndex(currentBeat: number): number {
    let nextBeat = currentBeat === 0 ? 1 : currentBeat;
    while (nextBeat > 16) {
      nextBeat = nextBeat - 16;
    }
    return nextBeat - 1;
  }

  private stop(): void {
    if (this.playSubscription) {
      this.playSubscription.unsubscribe();
    }
    this.bpm.stop();
    this.bpm.reset();
  }

  private getNextBeat(channel: Channel, currentBeat): Beat {
    const nextBeat = this.getNextBeatIndex(currentBeat);
    const beats = channel.beats.reduce((arr, beats) => arr.concat(beats), []);
    return beats[nextBeat];
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
      mute: false,
      solo: false
    };
    this.editorApiService.addChannel(newChannel)
      .subscribe((channels) => {
        this.channels$.next(channels);
      });
  }

  public toggleAllChannelSolo(solo: boolean): void {
    const channels = this.channels$.getValue();
    this.channels$.next(channels.map(c => ({...c, solo: solo})));
  }

  public toggleAllChannelMute(mute: boolean): void {
    const channels = this.channels$.getValue();
    this.channels$.next(channels.map(c => ({...c, mute: mute})));
  }

  public muteChannel(channel: Channel) {
    channel.mute = !channel.mute;
    const channels = this.channels$.getValue()
      .map(c => ({
        ...c,
        mute: channel.id === c.id ? channel.mute : c.mute
      }));
    this.channels$.next(channels);
    this.editorApiService.updateChannel(channel).subscribe();
  }

  public soloChannel(channel: Channel): void {
    channel.solo = !channel.solo;
    const channels = this.channels$.getValue()
      .map(c => ({
        ...c,
        solo: channel.id === c.id ? channel.solo : c.solo
      }));
    this.channels$.next(channels);
    this.editorApiService.updateChannel(channel).subscribe();
  }
}
