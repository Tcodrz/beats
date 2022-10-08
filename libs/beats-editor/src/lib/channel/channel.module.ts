import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelComponent } from './channel.component';
import {IconButtonModule, KnobModule, ToggleButtonModule} from "@beats/beats-ui";
import {DragDropModule} from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [ChannelComponent],
  imports: [
    CommonModule,
    ToggleButtonModule,
    KnobModule,
    IconButtonModule,
    DragDropModule
  ],
  exports: [ChannelComponent]
})
export class ChannelModule {}
