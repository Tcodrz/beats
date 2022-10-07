import {EditorApiService} from "../editor/editor-api.service";
import {fn} from "jest-mock";
import {of} from "rxjs";
import {channelsMock} from "../editor/editor-data.mock";


export function getEditorApiServiceMock(): Partial<EditorApiService> {
  return {
    getChannels: fn(() => of(channelsMock)),
    deleteChannel: fn(() => of(channelsMock)),
    addChannel: fn(() => of(channelsMock)),
    updateChannel: fn(() => of(true)),
  }
}
