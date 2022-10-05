import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ChannelComponent} from './channel.component';
import {Bar, Channel} from "@beats/api-interfaces";
import {ToggleButtonComponentMock} from "@beats/beats-ui";

const beatsMock: [Bar, Bar, Bar, Bar] = [
  [{on: false}, {on: false}, {on: false}, {on: false}],
  [{on: false}, {on: false}, {on: false}, {on: false}],
  [{on: false}, {on: false}, {on: false}, {on: false}],
  [{on: false}, {on: false}, {on: false}, {on: false}],
];

const channelMock: Channel = {
  id: 1234,
  name: 'mock channel',
  beats: beatsMock,
  volume: 0.7,
  mute: false,
  solo: false,
}


describe('ChannelComponent', () => {
  let component: ChannelComponent;
  let fixture: ComponentFixture<ChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChannelComponent],
      imports: [ToggleButtonComponentMock]
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelComponent);
    component = fixture.componentInstance;
    component.channel = channelMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onBeatClicked()', () => {
    let beat;
    beforeEach(() => {
      beat = {on: false};
    });

    it('Should set beat.on to true when beat.on is false', () => {
      component.onBeatClicked(beat);
      expect(beat.on).toBe(true);
    });

    it('Should call the previewElement play method when previewElement.src is initialized', () => {
      component.previewElement.nativeElement.src = 'mock';
      component.previewElement.nativeElement.play = jest.fn(() => Promise.resolve());
      component.onBeatClicked(beat);
      expect(component.previewElement.nativeElement.play).toHaveBeenCalled();
    });
  });

  describe('onUploadFile()', () => {
    let fileURLMock;
    let fileMock;
    let volumeMock;

    beforeEach(() => {
      volumeMock = 70;
      fileURLMock = 'mock_file_url';
      fileMock = {
        name: 'file_mock'
      };
      component.previewVolume.nativeElement.value = volumeMock.toString();
      component.previewElement.nativeElement.play = jest.fn(() => Promise.resolve());
      global.URL.createObjectURL = jest.fn(() => fileURLMock);
      component.onUploadFile({
        target: {
          files: {
            item: () => fileMock
          }
        }
      });
    });

    it('Should call URL.createObjectURL with file', () => {
      expect(global.URL.createObjectURL).toHaveBeenCalledWith(fileMock);
    });

    it('Should set the channel name with the file name provided in the event', () => {
      expect(component.channel.name).toEqual('file_mock');
    });

    it('Should set the previewElement src with the file url', () => {
      expect(component.previewElement.nativeElement.src).toEqual(`http://localhost/${fileURLMock}`);
    });

    it('Should set the channel fileURL with file url returned from URL.createObjectURL', () => {
      expect(component.channel.fileURL).toEqual(fileURLMock);
    });

    it('Should set the previewElement volumeMock to the volumeMock element value / 100', () => {
      expect(component.previewElement.nativeElement.volume).toEqual(volumeMock / 100);
    });
  });

  describe('onLoadSample()', () => {
    it('Should call the file input click method', () => {
      const clickSpy = jest.spyOn(component.fileInput.nativeElement, 'click');
      component.onLoadSample();
      expect(clickSpy).toHaveBeenCalled();
    });
  });

  describe('onVolumeChange()', () => {
    beforeEach(() => {
      component.onVolumeChange({
        target: {value: '70'}
      } as any);
    });
    it('Should set the channel volume to the value in the event divided by 100', () => {
      expect(component.channel.volume).toEqual(0.7);
    });

    it('Should set the preview element volume to the value in the event divided by 100', () => {
      expect(component.previewElement.nativeElement.volume).toEqual(0.7);
    });

    it('Should set the previewVolume to the value in the event', () => {
      expect(component.previewVolume.nativeElement.value).toEqual('70');
    });
  });

  describe('onMute()', () => {
    it('Should set the channel volume to 0 when isMuted is true', () => {
      component.onMute();
      expect(component.channel.volume).toBe(0);
    });
    it('Should set the channel volume to the original volume when isMuted is false', () => {
      component['isMuted'] = true;
      component['_volume'] = 0.7;
      component.onMute();
      expect(component.channel.volume).toBe(0.7);
    });
  });

  describe('onSolo()', () => {
    it('Should set channel.solo to true when channel.solo is false', () => {
      component.onSolo();
      expect(component.channel.solo).toBe(true);
    });
    it('Should set channel.solo to false when channel.solo is true', () => {
      component.channel.solo = true;
      component.onSolo();
      expect(component.channel.solo).toBe(false);
    });
  });
});
