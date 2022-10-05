import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider.component';
import {MatSliderModule} from "@angular/material/slider";
import {IconModule} from "../icon/icon.module";

@NgModule({
  declarations: [SliderComponent],
  imports: [CommonModule, MatSliderModule, IconModule],
  exports: [SliderComponent]
})
export class SliderModule {}
