import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { SignUpComponent } from './components/auth/signup/signup.component';
import { SignInComponent } from './components/auth/signin/signin.component';
import { BookListComponent } from './components/books/list/list.component';
import { BookItemComponent } from './components/books/item/item.component';
import { BookFormComponent } from './components/books/form/form.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { AuthService } from './services/auth.service';
import { AuthGardService } from './services/auth-gard.service';
import { BookService } from './services/books.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    BookListComponent,
    BookItemComponent,
    BookFormComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    AuthGardService,
    BookService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
