import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import {ButtonModule, ToggleButtonModule} from "@beats/beats-ui";

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ToggleButtonModule
  ],
  exports: [
    ToolbarComponent,
  ]
})
export class ToolbarModule {}
