import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  get currentUser(): object | unknown {
    let currentUser;
    firebase.auth().onAuthStateChanged(user => currentUser = user);
    return currentUser;
  }

  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(resolve, reject)
    )
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(resolve, reject)
    )
  }

  signOut() {
    firebase.auth().signOut()
  }
}
