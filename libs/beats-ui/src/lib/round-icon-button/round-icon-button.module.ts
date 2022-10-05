import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundIconButtonComponent } from './round-icon-button.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {IconModule} from "../icon/icon.module";

@NgModule({
  declarations: [RoundIconButtonComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, IconModule],
  exports: [RoundIconButtonComponent]
})
export class RoundIconButtonModule {}
