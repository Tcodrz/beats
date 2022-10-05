import {Component, OnInit} from '@angular/core';
import {PlayerService} from "./player.service";
import {BpmService} from "./bpm.service";
import {ButtonSize, ButtonType, Icons, SliderConfig} from "@beats/beats-ui";

export const DEFAULT_BPM = 120;

@Component({
  selector: 'beats-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {

  bpm = DEFAULT_BPM;
  isPlaying: boolean;
  icons = Icons;
  bpmSliderConfig: SliderConfig;
  buttonType = ButtonType;
  buttonSize = ButtonSize;

  constructor(
    private playerService: PlayerService,
    private bpmService: BpmService,
  ) {
  }

  ngOnInit(): void {
    this.bpmSliderConfig = {
      min: 50,
      max: 100,
      stepSize: 0.5,
      value: this.bpm / 2,
      showAddSubIcons: true,
      showSlider: false
    }
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

  public onBpmChanged(event: number): void {
    this.bpm = event * 2;
    this.isPlaying = false;
    this.bpmService.setBpm(this.bpm);
  }

}
