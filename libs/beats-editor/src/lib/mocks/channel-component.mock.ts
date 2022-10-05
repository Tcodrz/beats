import {Component, Input} from "@angular/core";
import {Channel} from "@beats/api-interfaces";

@Component({selector: 'beats-channel', template: '', standalone: true})
export class ChannelComponentMock {
  @Input() channel: Channel;
}
