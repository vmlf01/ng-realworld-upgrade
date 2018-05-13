import { EventEmitter, Injector, Input, Output, Component, OnInit, OnDestroy } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { MessageBusService } from '../../core/message-bus.service';
import { Subscription } from 'rxjs';

// upgrade an ng1 component using an element @Directive
@Component({
  // tslint:disable-next-line:directive-selector
  selector: 'rw-article-list',
  templateUrl: './article-list.component.html',
})
// tslint:disable-next-line:directive-class-suffix
export class ArticleListComponent implements OnInit, OnDestroy {
  @Input() limit: number;
  @Input() listConfig: any;
  // NOTE: use @Output() to handle a two-way binding ('=')
  @Output() listConfigChange = new EventEmitter<any>();

  list = [];
  loading = false;
  subscriptions: Subscription[] = [];

  constructor(
    private Articles: ArticlesService,
    private MessageBus: MessageBusService
  ) {
  }

  ngOnInit() {
    this.subscriptions = [
      this.MessageBus.on<object>('setListTo')
        .subscribe((msg) => {
          this.setListTo(msg.params);
        }),
      this.MessageBus.on<number>('setPageTo')
        .subscribe((msg) => {
          this.setPageTo(msg.params);
        }),
    ];

    this.setListTo(this.listConfig);
  }

  ngOnDestroy() {
    this.subscriptions
      .forEach(subscription => subscription.unsubscribe());
  }

  setListTo(newList) {
    // Set the current list to an empty array
    this.list = [];

    // Set listConfig to the new list's config
    this.listConfig = newList;

    this.runQuery();
  }

  setPageTo(pageNumber: number) {
    this.listConfig.currentPage = pageNumber;

    this.runQuery();
  }

 runQuery() {
    // Show the loading indicator
    this.loading = true;
    this.listConfig = this.listConfig || {};

    // Create an object for this query
    const queryConfig = {
      type: this.listConfig.type || undefined,
      filters: this.listConfig.filters || {},
    };

    // Set the limit filter from the component's attribute
    queryConfig.filters.limit = this.limit;

    // If there is no page set, set page as 1
    if (!this.listConfig.currentPage) {
      this.listConfig.currentPage = 1;
    }

    // Add the offset filter
    queryConfig.filters.offset = (this.limit * (this.listConfig.currentPage - 1));

    // Run the query
    this.Articles
      .query(queryConfig)
      .then((res) => {
        this.loading = false;

        // Update list and total pages
        this.list = res.articles;

        this.listConfig.totalPages = Math.ceil(res.articlesCount / this.limit);
      })
      .catch(() => this.loading = false);
  }
}
