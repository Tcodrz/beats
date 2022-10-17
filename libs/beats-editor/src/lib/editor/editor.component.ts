import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {EditorService} from "./editor.service";
import {Channel} from "@beats/api-interfaces"
import {Observable, tap} from "rxjs";
import {ButtonType, Icons} from "@beats/beats-ui";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'beats-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit {
  public readonly buttonTypes = ButtonType;
  public readonly icons = Icons;

  public channels$: Observable<Channel[]>;
  public isGlobalSoloActive: boolean;
  public isGlobalMuteActive: boolean;

  constructor(
    private editorService: EditorService,
  ) {
  }

  ngOnInit(): void {
    this.channels$ = this.editorService.getChannels()
      .pipe(
        tap(channels => {
          this.isGlobalMuteActive = channels.some(c => c.mute);
          this.isGlobalSoloActive = channels.some(c => c.solo);
        })
      );
  }

  public onDeleteChannel(channel: Channel): void {
    this.editorService.deleteChannel(channel);
  }

  public onAddChannel(event: Event): void {
    this.editorService.createNewChannel();
  }

  public onChannelSolo(channel: Channel): void {
    this.editorService.soloChannel(channel);
  }

  public onChannelMute(channel: Channel): void {
    this.editorService.muteChannel(channel);
  }

  public toggleGlobalSolo(): void {
    this.isGlobalSoloActive = !this.isGlobalSoloActive;
    this.editorService.toggleAllChannelSolo(this.isGlobalSoloActive);
  }

  public toggleGlobalMute(): void {
    this.isGlobalMuteActive = !this.isGlobalMuteActive;
    this.editorService.toggleAllChannelMute(this.isGlobalMuteActive);
  }

  public onDropChannel<T>(event: CdkDragDrop<T, Channel>): void {
    moveItemInArray(this.editorService.getChannelsValue(), event.previousIndex, event.currentIndex);
  }

  public onChannelPan(panValue: number, channel: Channel): void {
    this.editorService.setChannelPanValue(channel, panValue);
  }

  public onChannelSampleLoaded(channel: Channel): void {
    this.editorService.addAudioBufferDataToChannel(channel).then();
  }
}
