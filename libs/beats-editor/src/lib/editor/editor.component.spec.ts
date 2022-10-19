import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EditorComponent} from './editor.component';
import {EditorService} from "./editor.service";
import {EditorServiceMock, getEditorServiceMock} from "../mocks/editor-service.mock";
import {MockComponent} from "ng-mocks";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {ChannelComponent} from "@beats/beats-editor";
import {PlayerComponent} from "@beats/beats-player";
import {channelsMock} from "./editor-data.mock";

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let editorServiceMock: EditorServiceMock;

  beforeEach(async () => {

    editorServiceMock = getEditorServiceMock();

    await TestBed.configureTestingModule({
      declarations: [
        EditorComponent,
        MockComponent(ToolbarComponent),
        MockComponent(ChannelComponent),
        MockComponent(PlayerComponent),
      ],
      providers: [
        {provide: EditorService, useValue: editorServiceMock},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('Should call editoService.getChannels', () => {
      expect(editorServiceMock.getChannels).toHaveBeenCalled();
    });
    it('Should call editoService.isGlobalSoloActive$', () => {
      expect(editorServiceMock.isGlobalSoloActive$).toHaveBeenCalled();
    });
    it('Should call editoService.isGlobalMuteActive$', () => {
      expect(editorServiceMock.isGlobalMuteActive$).toHaveBeenCalled();
    });
  });

  describe('onDeleteChannel()', () => {
    it('Should call editorService.deleteChannel with channel', () => {
      const channelMock = Object.assign({}, channelsMock[0]);
      component.onDeleteChannel(channelMock);
      expect(editorServiceMock.deleteChannel).toHaveBeenCalledWith(channelMock)
    });
  });

  describe('onAddChannel()', () => {
    it('Should call editorService.createNewChannel()', () => {
      component.onAddChannel({} as Event);
      expect(editorServiceMock.createNewChannel).toHaveBeenCalled();
    });
  });

  describe('toggleGlobalSolo()', () => {
    it('Should call editorService.toggleAllChannelSolo', () => {
      component.toggleGlobalSolo();
      expect(editorServiceMock.toggleAllChannelSolo).toHaveBeenCalled();
    });
  });

  describe('toggleGlobalMute()', () => {
    it('Should call editorService.toggleAllChannelMute', () => {
      component.toggleGlobalMute();
      expect(editorServiceMock.toggleAllChannelMute).toHaveBeenCalled();
    });
  });

});
