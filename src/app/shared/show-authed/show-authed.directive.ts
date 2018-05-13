import { Directive, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
import { UserService } from '../../core/user.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[rwShowAuthed]',
})
export class ShowAuthedDirective implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('rwShowAuthed') showAuthed: boolean;

  userSubscription: Subscription;

  constructor(
    private userService: UserService,
    private element: ElementRef
  ) { }

  ngOnInit() {
    this.userSubscription = this.userService.CurrentUser.subscribe(user => {
      if (user) {
        this.element.nativeElement.style.display = this.showAuthed
          ? 'inherit'
          : 'none';
      } else {
        this.element.nativeElement.style.display = this.showAuthed
          ? 'none'
          : 'inherit';
      }
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
