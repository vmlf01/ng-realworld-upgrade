import { Directive, ElementRef, EventEmitter, Injector, Input, Output } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

// upgrade an ng1 component using an element @Directive
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'rw-article-list',
})
// tslint:disable-next-line:directive-class-suffix
export class ArticleListComponent extends UpgradeComponent {
  @Input() limit: number;
  @Input() listConfig: any;
  // NOTE: use @Output() to handle a two-way binding ('=')
  @Output() listConfigChange: EventEmitter<any>;

  constructor(elementRef: ElementRef, injector: Injector) {
    super('articleList', elementRef, injector);
  }
}
