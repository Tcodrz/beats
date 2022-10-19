import {EditorApiService} from "../editor/editor-api.service";
import {fn, Mock} from "jest-mock";
import {of} from "rxjs";
import {channelsMock} from "../editor/editor-data.mock";

export type EditorApiServiceMock = Partial<Record<keyof EditorApiService, Mock>>;

export function getEditorApiServiceMock(): EditorApiServiceMock {
  return {
    getChannels: fn(() => of(channelsMock)),
    deleteChannel: fn(() => of(channelsMock)),
    addChannel: fn(() => of(channelsMock)),
    updateChannel: fn(() => of(true)),
  }
}
