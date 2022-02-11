import { Injectable } from '@angular/core';
import { delay, Observable, of, retryWhen, switchMap } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor() {}
  connection$: WebSocketSubject<any> | null = null;
  connect(): Observable<any> {
    return of(environment.webSocketUrl).pipe(
      switchMap((wsUrl) => {
        if (this.connection$) {
          return this.connection$;
        } else {
          this.connection$ = webSocket(wsUrl);
          return this.connection$;
        }
      }),
      retryWhen((errors) =>
        errors.pipe(delay(environment.retry_connection_url))
      )
    );
  }
  send(data: any) {
    if (this.connection$) {
      this.connection$.next(data);
    } else {
      console.error('Did not send data, open a connection first');
    }
  }
  closeConnection() {
    if (this.connection$) {
      this.connection$.complete();
      this.connection$ = null;
    }
  }
  ngOnDestroy() {
    this.closeConnection();
  }
}
