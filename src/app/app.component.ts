import { Component } from '@angular/core';

@Component({
  selector: 'pt-root',
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pivot';
}
