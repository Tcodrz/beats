import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayerComponent} from './player.component';
import {RoundIconButtonModule, SliderModule} from "@beats/beats-ui";

@NgModule({
  declarations: [PlayerComponent],
  imports: [
    CommonModule,
    RoundIconButtonModule,
    SliderModule
  ],
  exports: [
    PlayerComponent
  ]
})
export class PlayerModule {
}
