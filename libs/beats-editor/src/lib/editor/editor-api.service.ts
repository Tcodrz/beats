import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Channel} from "@beats/api-interfaces";
import {channelsMock} from "./editor-data.mock";

@Injectable({
  providedIn: 'root'
})
export class EditorApiService {
  channels: Channel[] = channelsMock;

  constructor(
    private http: HttpClient
  ) {
  }

  getChannels(): Observable<Channel[]> {
    return new Observable<Channel[]>(observer => {
      observer.next(this.channels);
    });
  }

  deleteChannel(channel: Channel): Observable<Channel[]> {
    return new Observable<Channel[]>(observer => {
      observer.next(this.channels.filter(c => c.id !== channel.id));
    });
  }

  addChannel(channel: Channel): Observable<Channel[]> {
    return new Observable<Channel[]>(observer => {
      observer.next([...this.channels, channel]);
    });
  }

  updateChannel(channel: Channel): Observable<boolean> {
    return new Observable<boolean>(observer => {
      observer.next(true);
    });
  }
}
