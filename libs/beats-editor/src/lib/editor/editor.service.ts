import {Injectable} from '@angular/core';
import {Beat, Channel} from "@beats/api-interfaces";
import {channelsMock} from "./editor-data.mock";
import {PlayerService} from "@beats/beats-player";
import {BpmService} from "@beats/beats-player";
import {skip, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private context: AudioContext;
  private masterChannel: GainNode;
  private playSubscription: Subscription;
  private channelBeatsAudioMap = new Map<string, MediaElementAudioSourceNode>();

  constructor(
    private player: PlayerService,
    private bpm: BpmService,
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

  public getChannels(): Channel[] {
    return channelsMock;
  }

  private play(): void {
    this.initContext();
    this.playSubscription = this.bpm.getBpm()
      .subscribe(currentBeat => {
        const hasSoloChannels = channelsMock.some(c => c.solo);
        const channels = hasSoloChannels ? channelsMock.filter(c => c.solo) : channelsMock;
        channels
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
}
