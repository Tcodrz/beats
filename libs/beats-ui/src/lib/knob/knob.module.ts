import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnobComponent } from './knob.component';

@NgModule({
  declarations: [KnobComponent],
  imports: [CommonModule],
  exports: [
    KnobComponent
  ]
})
export class KnobModule {}
