import { Component, Input } from '@angular/core';

@Component({
  selector: 'rw-article-meta',
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.css'],
})
export class ArticleMetaComponent {
  @Input() article: any;
}
