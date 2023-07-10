import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { environment } from '../../../environments/environment';
import { retryWhen, delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CryptosocketService {

  socket$: WebSocketSubject<any> = new WebSocketSubject('');

  dataStreams: any = {};

  constructor() { 
    this.connect();
  }

  connect(){
    this.socket$ = webSocket({
      url: environment.socket_api,
      openObserver: {
        next: () => {
          console.log('CryptosocketService: connection opened');
        }
      },
      closeObserver: {
        next: () => {
          console.log('CryptosocketService: connection closed');
          // this.socket$ = undefined;
          this.reconnect();
        }
      }
    });
  }

  reconnect(){
    // wait for a second and then reconnect
    setTimeout(() => this.connect(), 1000);
  }

  displayGraph() {
    this.dataStreams = this.socket$.asObservable();
    this.socket$.next('message');
    return this.dataStreams;
  } 
}
