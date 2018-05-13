import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowAuthedDirective } from './show-authed/show-authed.directive';
import { FavoriteBtnComponent } from './favorite-btn/favorite-btn.component';
import { FollowBtnComponent } from './follow-btn/follow-btn.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ShowAuthedDirective,
        FavoriteBtnComponent,
        FollowBtnComponent,
    ],
    entryComponents: [
        FavoriteBtnComponent,
        FollowBtnComponent,
    ],
    exports: [
        ShowAuthedDirective,
        FavoriteBtnComponent,
        FollowBtnComponent,
    ],
})
export class SharedModule { }
