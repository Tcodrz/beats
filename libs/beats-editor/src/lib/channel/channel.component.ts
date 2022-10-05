import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Beat, Channel} from "@beats/api-interfaces";

@Component({
  selector: 'beats-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements AfterViewInit {
  @Input() channel: Channel;
  @ViewChild('audio', {static: true}) previewElement: ElementRef<HTMLAudioElement>;
  @ViewChild('fileInput', {static: true}) fileInput: ElementRef<HTMLInputElement>;
  @ViewChild('volume', { static: true}) previewVolume: ElementRef<HTMLInputElement>;
  private isMuted: boolean;
  private _volume: number;

  ngAfterViewInit(): void {
    this.setPreviewElementVolume(this.channel.volume);
  }

  public onBeatClicked(beat: Beat): void {
    beat.on = !beat.on;
    if (beat.on && this.previewElement.nativeElement.src) {
      this.previewElement.nativeElement.play().then();
    }
  }

  public onUploadFile(event): void {
    const files: FileList = event.target.files;
    const file = files.item(0);
    const fileURL = URL.createObjectURL(file);
    this.channel.name = file.name;
    this.previewElement.nativeElement.src = fileURL;
    this.channel.fileURL = fileURL;
    this.previewElement.nativeElement.volume = (+this.previewVolume.nativeElement.value / 100);
    this.previewElement.nativeElement.play().then();
  }

  public onLoadSample() {
    this.fileInput.nativeElement.click();
  }

  public onVolumeChange(event: Event): void {
    const volume = Number(event.target['value']) / 100;
    this.channel.volume = volume;
    this.setPreviewElementVolume(volume);
  }

  private setPreviewElementVolume(volume: number): void {
    if (volume > 0) {
      this._volume = volume;
    }
    this.previewElement.nativeElement.volume = volume;
    this.previewVolume.nativeElement.value = (volume * 100).toString();
  }

  public onMute(): void {
    this.isMuted = !this.isMuted;
    this.channel.volume = this.isMuted ? 0 : this._volume;
    this.setPreviewElementVolume(this.isMuted ? 0 : this._volume);
  }

  public onSolo(): void {
    this.channel.solo = !this.channel.solo;
  }
}
