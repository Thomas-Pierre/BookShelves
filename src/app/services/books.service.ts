import { Injectable } from '@angular/core';
import { BookModel } from '@/models/Book.model';
import { Subject } from 'rxjs';
import firebase from 'firebase';

import appConfig from '@/app.config';
const __ENV__: string = '/' + appConfig.firebase.environment;

@Injectable({
  providedIn: 'root'
})
export class BookService {
  books: BookModel[] = [];
  booksSubject = new Subject<BookModel[]>();

  categories = [
    {
      type: "livre", 
      categories: ["Bande dessinée", "Roman", "Magazine"]
    },
    {
      type: "Musique", 
      categories: ["CD", "Disque vinyl"]
    },
    {
      type: "Video", 
      categories: ["DVD", "BlueRay"]
    },
    {
      type: "Jeu Video", 
      categories: ["PS1", "PS2", "PS3", "PS4", "PS5"]
    },
    {
      type: "Autre", 
      categories: ["Autre"]
    },
  ]

  constructor() { }

  emitBooks(): void {
    this.booksSubject.next(this.books);
  }

  saveBooks(): void {
    firebase.database().ref(__ENV__ + '/books').set(this.books);
    this.emitBooks();
  }

  getAllBooks(): void {
    firebase.database().ref(__ENV__ + '/books').on('value', data => {
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
    })
  }

  getBook(id: number): Promise<unknown> {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(__ENV__ + '/books/' + id)
        .once('value')
        .then(
          data => resolve(data.val()),
          error => reject(error)
        );
    })
  }

  createNewBook(book: BookModel): void {
    this.books.push(book);
    this.saveBooks();
  }

  removeBook(book: BookModel) {
    const bookToRemoveIndex = this.books.findIndex(b => (b === book));

    this.books.splice(bookToRemoveIndex, 1)
    this.saveBooks();
  }

  uploadFile(file: File): Promise<unknown> {
    return new Promise( (resolve, reject) => {
      const fileName = __ENV__ + '/covers/' + file.name + '_' + Date.now().toString();
      firebase
        .storage()
        .ref()
        .child(fileName)
        .put(file)
        .on(firebase.storage.TaskEvent.STATE_CHANGED, 
          () => console.log('Loading file', file),
          error => reject('Loading error : ' + error),
          () => firebase.storage().ref(fileName).getDownloadURL().then(url => resolve(url))
        );
    });
  }
}
