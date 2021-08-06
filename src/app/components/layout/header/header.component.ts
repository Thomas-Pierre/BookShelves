import { AuthService } from '@/services/auth.service';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  user: any = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(user => {
      if (user) this.user = user.email;
      else this.user = '';
    })
  }

  onSignOut(): void {
    this.authService.signOut()
  }
}
