import {Beat, Channel} from '@beats/api-interfaces';
import {EditorService, PAN_MAX_VALUE} from "../editor/editor.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class ChannelService {
  private playSubscription: Subscription;
  private channel = new BehaviorSubject<Channel>(null);

  constructor(
    private editor: EditorService
  ) {
  }

  public setChannel(channel: Channel): void {
    this.channel.next(channel);
  }

  public getChannel(): Channel {
    return this.channel.getValue();
  }

  public async addAudioBufferDataToChannel(channel: Channel) {
    const audioData = await this.fetchAudio(channel.fileURL);
    channel.audioBufferData = await this.editor.getContext().decodeAudioData(audioData);
  }

  private async fetchAudio(url: string): Promise<ArrayBuffer> {
    const response = await fetch(url);
    return await response.arrayBuffer();
  }

  public play(): void {
    this.playSubscription = this.editor.getBPM()
      .subscribe(currentBeat => {
        const channel = this.channel.getValue();
        const beat = this.getNextBeat(channel, currentBeat);
        const isGlobalSoloActive = this.editor.isGlobalSoloActive();
        const shouldPlay = beat.on && (!isGlobalSoloActive || (isGlobalSoloActive && channel.solo));
        if (shouldPlay) {
          this.playOnce(channel);
        }
      });
  }

  public playOnce(channel: Channel): void {
    if (channel.mute) {
      return;
    }
    const context = this.editor.getContext();
    const source = context.createBufferSource();
    source.buffer = channel.audioBufferData;
    const volume = context.createGain();
    const panner = context.createPanner();
    panner.positionX.setValueAtTime(channel.panValue, 0);
    volume.gain.setValueAtTime(channel.volume, 0);
    source.loop = false;
    source
      .connect(volume)
      .connect(panner)
      .connect(context.destination);
    source.start(0);
  }

  public stop(): void {
    if (this.playSubscription) {
      this.playSubscription.unsubscribe();
    }
    this.editor.stop();
  }

  public setChannelPanValue(panValue: number): void {
    const channel = this.channel.getValue();
    channel.panValue = this.convertPercentageToPanValue(panValue);
    this.channel.next(channel);
  }

  private convertPercentageToPanValue(percentage: number): number {
    return -1 * (PAN_MAX_VALUE - (percentage / 50 * PAN_MAX_VALUE));
  }

  private getNextBeat(channel: Channel, currentBeat): Beat {
    const beats = channel.beats.reduce((arr, beats) => arr.concat(beats), []);
    if (currentBeat === 0) {
      currentBeat = 1;
    }
    return beats[currentBeat - 1];
  }

  public toggleChannelSolo(): void {
    const channel = this.channel.getValue();
    channel.solo = !channel.solo;
    this.channel.next(channel);
  }

  public setChannelSolo(): void {
    this.editor.soloChannel(this.channel.getValue());
  }

  public muteChannel(): void {
    this.editor.muteChannel(this.channel.getValue());
  }
}
