import { Routes } from '@angular/router';
import { SignUpComponent } from './components/auth/signup/signup.component';
import { SignInComponent } from './components/auth/signin/signin.component';
import { ItemsListComponent } from './components/items/list/list.component';
import { ItemsItemComponent } from './components/items/item/item.component';
import { ItemsFormComponent } from './components/items/form/form.component';
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
    path: 'items',
    canActivate: [AuthGardService],
    component: ItemsListComponent
  },
  {
    path: 'items/new',
    canActivate: [AuthGardService],
    component: ItemsFormComponent
  },
  {
    path: 'items/details/:id',
    canActivate: [AuthGardService],
    component: ItemsItemComponent
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