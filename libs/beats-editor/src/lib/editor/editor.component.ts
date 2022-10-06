import {Component, OnInit} from '@angular/core';
import {EditorService} from "./editor.service";
import {Channel} from "@beats/api-interfaces"
import {Observable} from "rxjs";

@Component({
  selector: 'beats-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  channels$: Observable<Channel[]>;
  constructor(
    private editorService: EditorService,
  ) {
  }

  ngOnInit(): void {
    this.channels$ = this.editorService.getChannels();
  }

  public onDeleteChannel(channel: Channel): void {
    this.editorService.deleteChannel(channel);
  }
}
