import { ItemModel } from '@/models/Item.model';
import { ItemsService } from '@/services/items.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class ItemsFormComponent implements OnInit {

  itemForm?: FormGroup | any;
  fileUrl?: string | unknown;
  fileUploading: boolean = false;
  fileUploaded: boolean = false;
  state?: number;
  imageUrl?: string;
  categories?: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private itemsService: ItemsService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.initForm();
    this.categories = this.itemsService.categories;
  }

  initForm(): void {
    this.itemForm = this.formBuilder.group({
      id: [Date.now()],
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      category: ['', [Validators.required]],
      editor: ['', [Validators.required]],
      publishDate: ['1970-01-01', [Validators.required]],
      state: [7, [Validators.required]],
      cover: [''],
      isbn: [''],
      barcode: [''],
      index: [''],
    })
  }

  onSaveItem(): void {
    const { id, title, author, category, editor, publishDate, state, cover, isbn, barcode, index } = this.itemForm?.value;
    const newItem = new ItemModel(id, title, author, category, editor, publishDate, state, cover, isbn, barcode, index);

    if (this.fileUrl && this.fileUrl !== '') {
      newItem.cover = this.fileUrl;
    }

    this.itemsService.createNewItem(newItem);
    this.router.navigate(['/items']);
  }


  onUploadFile(file: File) {
    this.fileUploading = true;
    this.itemsService.uploadFile(file).then(
      url => {
        this.fileUrl = url;
        this.fileUploading = false;
        this.fileUploaded = true;
      }
    )
  }

  detectFiles(event: any) {
    this.onUploadFile(event.target?.files[0]);
  }

}
