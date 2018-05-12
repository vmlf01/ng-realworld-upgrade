import { Component, OnInit, Inject } from '@angular/core';
import { TagsService } from '../services/tags.service';
import { MessageBusService } from '../services/message-bus.service';
import { AppConstants } from '../app.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  appName: string;
  tagsLoaded: boolean;
  tags: any[];
  listConfig: {
    type: 'feed' | 'all',
    filters?: {
      tag: string
    }
  };

  constructor(
    @Inject('User') private User: any,
    private Tags: TagsService,
    private AppConstants: AppConstants,
    private MessageBusService: MessageBusService,
  ) { }

  ngOnInit() {
    this.appName = this.AppConstants.appName;

    // Get list of all tags
    this.Tags
      .getAll()
      .then(
        (tags) => {
          this.tagsLoaded = true;
          this.tags = tags
        }
      );

    // Set current list to either feed or all, depending on auth status.
    this.listConfig = {
      type: this.User.current ? 'feed' : 'all'
    };
  }

  changeList(newList) {
    this.MessageBusService.broadcast('setListTo', newList);
  }
}
