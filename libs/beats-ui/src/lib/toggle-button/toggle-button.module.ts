import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleButtonComponent } from './toggle-button.component';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [ToggleButtonComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [ToggleButtonComponent]
})
export class ToggleButtonModule {}
