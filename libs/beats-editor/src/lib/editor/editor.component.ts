import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {EditorService} from "./editor.service";
import {Channel} from "@beats/api-interfaces"
import {Observable} from "rxjs";
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
  public isGlobalSoloActive$: Observable<boolean>;
  public isGlobalMuteActive$: Observable<boolean>;

  constructor(
    private editorService: EditorService,
  ) {
  }

  ngOnInit(): void {
    this.channels$ = this.editorService.getChannels();
    this.isGlobalSoloActive$ = this.editorService.isGlobalSoloActive$();
    this.isGlobalMuteActive$ = this.editorService.isGlobalMuteActive$();
  }

  public onDeleteChannel(channel: Channel): void {
    this.editorService.deleteChannel(channel);
  }

  public onAddChannel(event: Event): void {
    this.editorService.createNewChannel();
  }

  public toggleGlobalSolo(): void {
    this.editorService.toggleAllChannelSolo()
  }

  public toggleGlobalMute(): void {
    this.editorService.toggleAllChannelMute();
  }

  public onDropChannel<T>(event: CdkDragDrop<T, Channel>): void {
    moveItemInArray(this.editorService.getChannelsValue(), event.previousIndex, event.currentIndex);
  }
}
