import { BookModel } from '@/models/Book.model';
import { BookService } from '@/services/books.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class BookFormComponent implements OnInit {

  bookForm?: FormGroup | any;
  fileUrl?: string | unknown;
  fileUploading: boolean = false;
  fileUploaded: boolean = false;
  state?: number;
  imageUrl?: string;
  categories?: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.initForm();
    this.categories = this.bookService.categories;
  }

  initForm(): void {
    this.bookForm = this.formBuilder.group({
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

  onSaveBook(): void {
    const { id, title, author, category, editor, publishDate, state, cover, isbn, barcode, index } = this.bookForm?.value;
    const newBook = new BookModel(id, title, author, category, editor, publishDate, state, cover, isbn, barcode, index);

    if (this.fileUrl && this.fileUrl !== '') {
      newBook.cover = this.fileUrl;
    }

    this.bookService.createNewBook(newBook);
    this.router.navigate(['/books']);
  }


  onUploadFile(file: File) {
    this.fileUploading = true;
    this.bookService.uploadFile(file).then(
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
