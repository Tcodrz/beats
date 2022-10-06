import {EditorService} from "../editor/editor.service";
import {channelsMock} from "../editor/editor-data.mock";
import {Mock, fn} from 'jest-mock';
import {of} from "rxjs";

export type EditorServiceMock = Partial<Record<keyof EditorService, Mock>>;

export function getEditorServiceMock(): EditorServiceMock {
  return {
    getChannels: fn(() => of(JSON.parse(JSON.stringify(channelsMock))))
  }
}
