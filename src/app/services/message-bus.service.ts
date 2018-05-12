import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageBusService {

  constructor(
    @Inject('$rootScope') private $rootScope: any
  ) { }

  broadcast(event: string, params: any) {
    this.$rootScope.$broadcast(event, params);
  }
}
