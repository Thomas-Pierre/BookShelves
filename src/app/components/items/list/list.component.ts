import { ItemModel } from '@/models/Item.model';
import { ItemsService } from '@/services/items.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ItemsListComponent implements OnInit, OnDestroy {

  items?: ItemModel[];
  itemsSubscription?: Subscription;

  @ViewChild('modal')
  set modal(modal: ElementRef) {
    modal?.nativeElement.focus();
  }

  constructor(
    private itemsService: ItemsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.itemsSubscription = this.itemsService.itemsSubject.subscribe(
      (items: ItemModel[]) => (this.items = items)
    );
    this.itemsService.getAllItems();
    this.itemsService.emitItems();
  }

  ngOnDestroy(): void {
    this.itemsSubscription?.unsubscribe()
  }
}
