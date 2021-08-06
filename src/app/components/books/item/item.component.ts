import { BookModel } from '@/models/Book.model';
import { BookService } from '@/services/books.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
})
export class BookItemComponent implements OnInit {
  book?: BookModel;
  stars: any[] = [];

  constructor(
    private booksService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    
    this.booksService.getBook(+id).then(
      (book: any) => { 
        this.book = book; 
        
        for (let i = 0; i < Math.floor(book.state / 2); i++) 
          this.stars.push('star-fill');

        if (this.stars.length < 5 && (book.state / 2) - Math.floor(book.state / 2) === 0.5) 
          this.stars.push('star-half');

        for (let i = 0; i < 5 - this.stars.length; i++) 
          this.stars.push('star');
      }
    )

    
  }

  onDeleteBook(book: BookModel): void {
    this.booksService.removeBook(book);
    this.router.navigate(['/books']);
  }

  onEditBook(book: BookModel): void {
    // this.booksService.editBook(book);
  }
}
