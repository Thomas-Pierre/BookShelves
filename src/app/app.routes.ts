import { Routes } from '@angular/router';
import { SignUpComponent } from './components/auth/signup/signup.component';
import { SignInComponent } from './components/auth/signin/signin.component';
import { BookListComponent } from './components/books/list/list.component';
import { BookItemComponent } from './components/books/item/item.component';
import { BookFormComponent } from './components/books/form/form.component';
import { AuthGardService } from './services/auth-gard.service';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes =  [
  {
    path: 'auth/signup',
    component: SignUpComponent
  },
  {
    path: 'auth/signin',
    component: SignInComponent
  },
  {
    path: 'books',
    canActivate: [AuthGardService],
    component: BookListComponent
  },
  {
    path: 'books/new',
    canActivate: [AuthGardService],
    component: BookFormComponent
  },
  {
    path: 'books/details/:id',
    canActivate: [AuthGardService],
    component: BookItemComponent
  },
  {
    path: 'not-found', 
    component: ErrorComponent
  },
  {
    path: '', 
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: 'not-found', 
  }
]