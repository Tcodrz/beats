import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from './icon-button.component';
import {MatButtonModule} from "@angular/material/button";
import {IconModule} from "../icon/icon.module";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [IconButtonComponent],
  imports: [CommonModule, MatButtonModule, IconModule, MatIconModule],
  exports: [IconButtonComponent]
})
export class IconButtonModule {}
