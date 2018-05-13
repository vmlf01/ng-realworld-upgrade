import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowAuthedDirective } from './show-authed/show-authed.directive';
import { FavoriteBtnComponent } from './favorite-btn/favorite-btn.component';
import { FollowBtnComponent } from './follow-btn/follow-btn.component';
import { ListPaginationComponent } from './list-pagination/list-pagination.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ShowAuthedDirective,
        FavoriteBtnComponent,
        FollowBtnComponent,
        ListPaginationComponent,
    ],
    entryComponents: [
        FavoriteBtnComponent,
        FollowBtnComponent,
        ListPaginationComponent,
    ],
    exports: [
        ShowAuthedDirective,
        FavoriteBtnComponent,
        FollowBtnComponent,
        ListPaginationComponent,
    ],
})
export class SharedModule { }
