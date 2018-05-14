import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleMetaComponent } from './article-meta/article-meta.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    ArticleListComponent,
  ],
  declarations: [
    ArticleListComponent,
    ArticleMetaComponent,
    ArticlePreviewComponent,
  ],
  entryComponents: [
    ArticleListComponent,
    ArticleMetaComponent,
  ],
})
export class ArticlesModule { }
