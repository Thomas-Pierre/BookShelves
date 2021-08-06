import { Component } from '@angular/core';
import firebase from 'firebase';
import appConfig from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'bookshelves';

  constructor() {
    firebase.initializeApp(appConfig.firebase);
  }
}
