import { Component } from "@angular/core";

// NOTE: this will be the root component for Angular app,
// it is currently being used inside ng1 app-view.html,
// which sets up overall page structure and contains <ui-view>,
// so we only need Angular <router-outlet> here
@Component({
    selector: 'app-root',
    template: `
      <router-outlet></router-outlet>
    `
})
export class AppRootComponent { }
