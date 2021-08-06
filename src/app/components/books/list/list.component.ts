import { BookModel } from '@/models/Book.model';
import { BookService } from '@/services/books.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class BookListComponent implements OnInit, OnDestroy {

  books?: BookModel[];
  booksSubscription?: Subscription;

  @ViewChild('modal')
  set modal(modal: ElementRef) {
    modal?.nativeElement.focus();
  }

  constructor(
    private booksService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: BookModel[]) => (this.books = books)
    );
    this.booksService.getAllBooks();
    this.booksService.emitBooks();
  }

  ngOnDestroy(): void {
    this.booksSubscription?.unsubscribe()
  }
}
