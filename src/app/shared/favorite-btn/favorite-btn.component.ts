import { Component, Input, Inject } from '@angular/core';
import { UserService } from '../../core/user.service';
import { ArticlesService } from '../../services/articles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'rw-favorite-btn',
  templateUrl: './favorite-btn.component.html',
})
export class FavoriteBtnComponent {
  @Input() article: any;

  isSubmitting = false;

  constructor(
    private User: UserService,
    private Articles: ArticlesService,
    private router: Router
  ) { }

  submit() {
    this.isSubmitting = true;

    if (!this.User.current) {
      this.router.navigate(['/register']);
      return;
    }

    if (this.article.favorited) {
      this.Articles.unfavorite(this.article.slug)
        .then(() => {
          this.isSubmitting = false;
          this.article.favorited = false;
          this.article.favoritesCount--;
        })
        .catch(() => this.isSubmitting = false);
    } else {
      this.Articles.favorite(this.article.slug)
        .then(() => {
          this.isSubmitting = false;
          this.article.favorited = true;
          this.article.favoritesCount++;
        })
        .catch(() => this.isSubmitting = false);
    }
  }
}
