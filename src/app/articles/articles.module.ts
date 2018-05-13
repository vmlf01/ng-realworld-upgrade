import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleMetaComponent } from './article-meta/article-meta.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ArticleListComponent,
  ],
  declarations: [
    ArticleListComponent,
    ArticleMetaComponent,
  ],
  entryComponents: [
    ArticleMetaComponent,
  ]
})
export class ArticlesModule { }
