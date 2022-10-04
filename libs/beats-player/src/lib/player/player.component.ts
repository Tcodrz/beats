import {Component, OnInit} from '@angular/core';
import {PlayerService} from "./player.service";
import {BpmService} from "./bpm.service";

export const DEFAULT_BPM = 120;

@Component({
  selector: 'beats-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {

  bpm = DEFAULT_BPM;
  isPlaying: boolean;

  constructor(
    private playerService: PlayerService,
    private bpmService: BpmService,
  ) {
  }

  ngOnInit(): void {
    this.bpmService.setBpm(this.bpm);
  }

  public onClickPlay(): void {
    if (this.isPlaying) {
      this.playerService.stop();
      this.isPlaying = false;
    } else {
      this.playerService.play();
      this.isPlaying = true;
    }
  }


  public onBpmChanged(event: Event): void {
    this.bpm = Number(event.target['value']);
    this.isPlaying = false;
    this.bpmService.setBpm(this.bpm);
  }

}
