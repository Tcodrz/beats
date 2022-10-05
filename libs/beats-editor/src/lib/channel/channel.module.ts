import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelComponent } from './channel.component';
import {ToggleButtonModule} from "@beats/beats-ui";

@NgModule({
  declarations: [ChannelComponent],
  imports: [CommonModule, ToggleButtonModule],
  exports: [ChannelComponent]
})
export class ChannelModule {}
