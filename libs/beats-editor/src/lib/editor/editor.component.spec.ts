import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EditorComponent} from './editor.component';
import {EditorService} from "./editor.service";
import {EditorServiceMock, getEditorServiceMock} from "../mocks/editor-service.mock";
import {PlayerComponentMock} from "../mocks/player-component.mock";
import {ChannelComponentMock} from "../mocks/channel-component.mock";


describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let editorServiceMock: EditorServiceMock;

  beforeEach(async () => {

    editorServiceMock = getEditorServiceMock();

    await TestBed.configureTestingModule({
      declarations: [EditorComponent],
      imports: [ChannelComponentMock, PlayerComponentMock],
      providers: [
        {provide: EditorService, useValue: editorServiceMock}
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
    it('Should call editorService.getChannels', () => {
      expect(editorServiceMock.getChannels).toHaveBeenCalled();
    });
  });
});
