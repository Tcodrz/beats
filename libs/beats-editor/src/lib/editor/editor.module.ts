import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditorComponent} from './editor.component';
import {RouterModule, Routes} from "@angular/router";
import {ChannelModule} from "../channel/channel.module";
import {PlayerModule} from "@beats/beats-player";
import {ButtonModule, ToggleButtonModule} from "@beats/beats-ui";

const routes: Routes = [
  {path: '', component: EditorComponent}
];

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ChannelModule,
    PlayerModule,
    ButtonModule,
    ToggleButtonModule
  ],
})
export class EditorModule {
}
