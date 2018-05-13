import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rw-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.css'],
})
export class ArticlePreviewComponent implements OnInit {
  @Input() article;

  constructor() { }

  ngOnInit() {
  }

}
