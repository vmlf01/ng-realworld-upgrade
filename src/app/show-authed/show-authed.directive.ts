import { Directive, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[showAuthed]'
})
export class ShowAuthedDirective implements OnInit, OnDestroy {
  @Input() showAuthed: boolean;

  userSubscription: Subscription;

  constructor(
    private UserService: UserService,
    private element: ElementRef
  ) { }

  ngOnInit() {
    this.userSubscription = this.UserService.CurrentUser.subscribe(user => {
      console.log('USER CHANGED', user);
      if (user) {
        this.element.nativeElement.style.display = this.showAuthed
          ? 'inherit'
          : 'none';
      }
      else {
        this.element.nativeElement.style.display = this.showAuthed
          ? 'none'
          : 'inherit';
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription && this.userSubscription.unsubscribe();
  }
}
