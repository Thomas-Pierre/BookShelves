import { ItemModel } from '@/models/Item.model';
import { ItemsService } from '@/services/items.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
})
export class ItemsItemComponent implements OnInit {
  item?: ItemModel;
  stars: string[] = [];

  constructor(
    private itemsService: ItemsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    
    this.itemsService.getItem(+id).then((item: any) => { 
      this.item = item; 
      
      for (let i = 0; i < Math.floor(item.state / 2); i++) 
        this.stars.push('star-fill');

      if (this.stars.length < 5 && (item.state / 2) - Math.floor(item.state / 2) === 0.5) 
        this.stars.push('star-half');

      for (let i = 0; i < 5 - this.stars.length; i++) 
        this.stars.push('star');
    })
  }

  onDeleteItem(item: ItemModel): void {
    this.itemsService.removeItem(item);
    this.router.navigate(['/items']);
  }

  onEditItem(item: ItemModel): void {
    // this.itemsService.editItem(item);
  }
}
