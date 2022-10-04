import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditorComponent} from './editor.component';
import {RouterModule, Routes} from "@angular/router";
import {ChannelModule} from "../../../../../apps/beats/src/app/channel/channel.module";
import {PlayerModule} from "../../../../../apps/beats/src/app/bpm/player/player.module";

const routes: Routes = [
  {path: '', component: EditorComponent}
];

@NgModule({
  declarations: [EditorComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ChannelModule, PlayerModule],
})
export class EditorModule {
}
