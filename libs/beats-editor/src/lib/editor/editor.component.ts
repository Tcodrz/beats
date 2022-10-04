import {Component, OnInit} from '@angular/core';
import {EditorService} from "./editor.service";
import {Channel} from "@beats/api-interfaces"

@Component({
  selector: 'beats-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  channels: Channel[];
  constructor(
    private editorService: EditorService,
  ) {
  }

  ngOnInit(): void {
    this.channels = this.editorService.getChannels();
  }
}
