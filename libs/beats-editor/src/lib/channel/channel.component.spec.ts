import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';
import {ChannelComponent} from './channel.component';
import {Bar, Channel} from "@beats/api-interfaces";
import {IconButtonComponent, KnobComponent, ToggleButtonComponent} from "@beats/beats-ui";
import {EditorService} from "../editor/editor.service";
import {EditorServiceMock, getEditorServiceMock} from "../mocks/editor-service.mock";
import {MockComponent} from "ng-mocks";
import {ChannelService} from "@beats/beats-editor";
import {of} from "rxjs";


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
  panValue: 0,
}

function getChannelServiceMock(): Partial<ChannelService> {
  return {
    setChannel: jest.fn(),
    addAudioBufferDataToChannel: jest.fn(() => Promise.resolve()),
    play: jest.fn(),
    playOnce: jest.fn(),
    stop: jest.fn(),
    setChannelPanValue: jest.fn(),
    toggleChannelSolo: jest.fn(),
    setChannelSolo: jest.fn(),
    muteChannel: jest.fn(),
  }
}

describe('ChannelComponent', () => {
  let component: ChannelComponent;
  let fixture: ComponentFixture<ChannelComponent>;
  let editorServiceMock: EditorServiceMock;
  let channelServiceMock: Partial<ChannelService>;

  beforeEach(async () => {

    editorServiceMock = getEditorServiceMock();

    channelServiceMock = getChannelServiceMock();

    TestBed.overrideComponent(ChannelComponent, {
      set: {
        providers: [
          {provide: ChannelService, useValue: channelServiceMock}
        ]
      }
    })

    await TestBed.configureTestingModule({
      declarations: [
        ChannelComponent,
        MockComponent(KnobComponent),
        MockComponent(IconButtonComponent),
        MockComponent(ToggleButtonComponent),
      ],
      providers: [
        {provide: EditorService, useValue: editorServiceMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelComponent);
    component = fixture.componentInstance;
    component.setChannel = channelMock;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('Should call editorService.isPlaying', () => {
      expect(editorServiceMock.isPlaying).toHaveBeenCalled();
    });
    it('Should call channelService.play when isPlaying is true', () => {
      editorServiceMock.isPlaying.mockImplementation(() => of(true));
      component.ngOnInit();
      expect(channelServiceMock.play).toHaveBeenCalled();
    });
    it('Should call channelService.stop when isPlaying is false', () => {
      editorServiceMock.isPlaying.mockImplementation(() => of(false));
      component.ngOnInit();
      expect(channelServiceMock.stop).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy()', () => {
    it('Should call channelService.stop', () => {
      component.ngOnDestroy();
      expect(channelServiceMock.stop).toHaveBeenCalled();
    });
  });

  describe('onBeatClicked()', () => {
    let mockBeat;
    it('Should set beat.on to true when called with beat.on = false', () => {
      mockBeat = {on: false};
      component.onBeatClicked(mockBeat);
      expect(mockBeat.on).toBe(true);
    });
    it('Should set beat.on to false when called with beat.on = true', () => {
      mockBeat = {on: true};
      component.onBeatClicked(mockBeat);
      expect(mockBeat.on).toBe(false);
    });
    it('Should call channelService.playOnce when beat.on is true and isPlaying is false', () => {
      mockBeat = {on: false};
      component['isPlaying'] = false;
      component.onBeatClicked(mockBeat);
      expect(channelServiceMock.playOnce).toHaveBeenCalledWith(channelMock);
    });
  });

  describe('onUploadFile()', () => {
    let fileURLMock;
    let fileMock;

    beforeEach(() => {
      fileURLMock = 'mock_file_url';
      fileMock = {
        name: 'file_mock'
      };
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

    it('Should set the channel fileURL with file url returned from URL.createObjectURL', () => {
      expect(component.channel.fileURL).toEqual(fileURLMock);
    });

    it('Should call channelService.addAudioBufferDataToChannel with channel', () => {
      expect(channelServiceMock.addAudioBufferDataToChannel).toHaveBeenCalledWith(channelMock);
    });

    it('Should call channelService.playOnce when isPlaying is false', fakeAsync(() => {
      component['isPlaying'] = false;
      component.onUploadFile({target: {files: {item: () => fileMock}}});
      tick();
      expect(channelServiceMock.playOnce).toHaveBeenCalledWith(channelMock);
    }));
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
      component.onVolumeChange(70);
    });
    it('Should set the channel volume to the value in the event divided by 100', () => {
      expect(component.channel.volume).toEqual(0.7);
    });
  });

  describe('onMute()', () => {
    it('Should call channelService.muteChannel', () => {
      component.onMute();
      expect(channelServiceMock.muteChannel).toHaveBeenCalled();
    })
  });

  describe('onSolo()', () => {
    it('Should call channelService.soloChannel', () => {
      component.onSolo();
      expect(channelServiceMock.setChannelSolo).toHaveBeenCalled();
    })
  });

  describe('onDeleteChannel()', () => {
    it('Should emit deleteChannel event', () => {
      const deleteChannelEventSpy = jest.spyOn(component.deleteChannel, 'emit');
      component.onDeleteChannel();
      expect(deleteChannelEventSpy).toHaveBeenCalledWith(component.channel);
    });
  });

  describe('onChannelPan()', () => {
    it('Should call channelService.setChannelPanValue with pan value', () => {
      component.onChannelPan(1);
      expect(channelServiceMock.setChannelPanValue).toHaveBeenCalledWith(1);
    });
  });
});
