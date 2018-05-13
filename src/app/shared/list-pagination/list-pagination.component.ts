import { Component, OnInit, Input } from '@angular/core';
import { MessageBusService } from '../../core/message-bus.service';

@Component({
  selector: 'rw-list-pagination',
  templateUrl: './list-pagination.component.html',
  styleUrls: ['./list-pagination.component.css'],
})
export class ListPaginationComponent {
  @Input() totalPages: number;
  @Input() currentPage: number;

  constructor(
    private MessageBus: MessageBusService
  ) { }

  pageRange(total) {
    const pages = [];

    for (let i = 0; i < total; i++) {
      pages.push(i + 1);
    }

    return pages;
  }

  changePage(number) {
    this.MessageBus.broadcast('setPageTo', number);
  }
}
