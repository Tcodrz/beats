import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelComponent } from './channel.component';
import {KnobModule, ToggleButtonModule} from "@beats/beats-ui";

@NgModule({
  declarations: [ChannelComponent],
  imports: [CommonModule, ToggleButtonModule, KnobModule],
  exports: [ChannelComponent]
})
export class ChannelModule {}
