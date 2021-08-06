import { Injectable } from '@angular/core';
import { ItemModel } from '@/models/Item.model';
import { Subject } from 'rxjs';
import firebase from 'firebase';

import appConfig from '@/app.config';
const __ENV__: string = '/' + appConfig.firebase.environment;

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  items: ItemModel[] = [];
  itemsSubject = new Subject<ItemModel[]>();

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

  emitItems(): void {
    this.itemsSubject.next(this.items);
  }

  saveItems(): void {
    firebase.database().ref(__ENV__ + '/items').set(this.items);
    this.emitItems();
  }

  getAllItems(): void {
    firebase.database().ref(__ENV__ + '/items').on('value', data => {
      this.items = data.val() ? data.val() : [];
      this.emitItems();
    })
  }

  getItem(id: number): Promise<unknown> {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(__ENV__ + '/items/' + id)
        .once('value')
        .then(
          data => resolve(data.val()),
          error => reject(error)
        );
    })
  }

  createNewItem(item: ItemModel): void {
    this.items.push(item);
    this.saveItems();
  }

  removeItem(item: ItemModel) {
    const itemToRemoveIndex = this.items.findIndex(b => (b === item));
    this.items.splice(itemToRemoveIndex, 1)
    this.saveItems();
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
