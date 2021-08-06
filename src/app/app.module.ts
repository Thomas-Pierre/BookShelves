import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';

import { routes } from '@/app.routes';
import { AppComponent } from '@/app.component';
import { SignUpComponent } from '@/components/auth/signup/signup.component';
import { SignInComponent } from '@/components/auth/signin/signin.component';
import { ItemsListComponent } from '@/components/items/list/list.component';
import { ItemsItemComponent } from '@/components/items/item/item.component';
import { ItemsFormComponent } from '@/components/items/form/form.component';
import { HeaderComponent } from '@/components/layout/header/header.component';
import { AuthService } from '@/services/auth.service';
import { AuthGardService } from '@/services/auth-gard.service';
import { ItemsService } from '@/services/items.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '@/components/layout/footer/footer.component';
import { ErrorComponent } from '@/components/error/error.component';
import { HomeComponent } from '@/components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    ItemsListComponent,
    ItemsItemComponent,
    ItemsFormComponent,
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
    ItemsService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
