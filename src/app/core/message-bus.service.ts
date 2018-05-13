import { Injectable, Inject } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

export class EventMessage<T> {
  event: string;
  params: T;
}

@Injectable({
  providedIn: 'root',
})
export class MessageBusService {
  private readonly messages = new Subject<EventMessage<any>>();

  constructor(
    @Inject('$rootScope') private $rootScope: any
  ) { }

  broadcast(event: string, params: any) {
    this.$rootScope.$broadcast(event, params);

    this.messages.next({ event, params });
  }

  on<T>(event: string): Observable<EventMessage<T>> {
    return this.messages
      .pipe(
        filter(msg => msg.event === event)
      );
  }
}
