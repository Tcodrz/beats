import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Beat, Channel} from "@beats/api-interfaces";
import {Icons} from "@beats/beats-ui";
import {EditorService} from "../editor/editor.service";
import {ChannelService} from "./channel.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'beats-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
  providers: [ChannelService]
})
export class ChannelComponent implements OnInit, OnDestroy {
  @Input('channel') set setChannel(value: Channel) {
    this.channel = value;
    this.channelPanValue = Math.floor(((this.channel.panValue / 3.4 / 2) + 0.5) * 100);
    this.channelService.setChannel(this.channel);
  }

  @Output() deleteChannel = new EventEmitter<Channel>();
  @ViewChild('fileInput', {static: true}) fileInput: ElementRef<HTMLInputElement>;
  public readonly icons = Icons;
  showDragHandle: boolean;
  channelPanValue: number;
  channel: Channel;
  private isPlaying: boolean;
  private playSubscription: Subscription;

  constructor(
    private editor: EditorService,
    private channelService: ChannelService,
  ) { }

  ngOnInit(): void {
    this.playSubscription = this.editor.isPlaying()
      .subscribe(isPlaying => {
        this.isPlaying = isPlaying;
        if (this.isPlaying) {
          this.channelService.play();
        } else {
          this.channelService.stop();
        }
      });
  }

  ngOnDestroy(): void {
    this.channelService.stop();
    this.playSubscription && this.playSubscription.unsubscribe();
  }

  public onBeatClicked(beat: Beat): void {
    beat.on = !beat.on;
    if (beat.on && !this.isPlaying) {
      this.channelService.playOnce(this.channel);
    }
  }

  public async onUploadFile(event): Promise<void> {
    const files: FileList = event.target.files;
    const file = files.item(0);
    const fileURL = URL.createObjectURL(file);
    this.channel.name = file.name;
    this.channel.fileURL = fileURL;
    await this.channelService.addAudioBufferDataToChannel(this.channel);
    !this.isPlaying && this.channelService.playOnce(this.channel);
  }

  public onLoadSample() {
    this.fileInput.nativeElement.click();
  }

  public onVolumeChange(event: number): void {
    this.channel.volume = event / 100;
  }

  public onMute(): void {
    this.channelService.muteChannel();
  }

  public onSolo(): void {
    this.channelService.setChannelSolo();
  }

  public onDeleteChannel(): void {
    if (this.isPlaying) {
      this.channelService.stop();
    }
    this.deleteChannel.emit(this.channel);
  }

  public onChannelPan(panValue: number): void {
    this.channelService.setChannelPanValue(panValue);
  }
}
