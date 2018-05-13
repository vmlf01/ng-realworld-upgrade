import { Component, Input, Inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'rw-follow-btn',
  templateUrl: './follow-btn.component.html',
})
export class FollowBtnComponent {
  @Input() user: any;

  isSubmitting = false;

  constructor(
    private Profile: ProfileService,
    private User: UserService,
    @Inject('$state') private $state: any
  ) { }

  submit() {
    this.isSubmitting = true;

    if (!this.User.current) {
      this.$state.go('app.register');
      return;
    }

    // If following already, unfollow
    if (this.user.following) {
      this.Profile.unfollow(this.user.username)
        .then(() => {
          this.isSubmitting = false;
          this.user.following = false;
        })
        .catch(() => this.isSubmitting = false);

    // Otherwise, follow them
    } else {
      this.Profile.follow(this.user.username)
        .then(() => {
          this.isSubmitting = false;
          this.user.following = true;
        })
        .catch(() => this.isSubmitting = false);
    }
  }
}
