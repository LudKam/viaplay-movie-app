import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AngularMaterialModule } from './angularmaterial.module';

import { routing } from './app.routes';

import { AppComponent } from './components/app.component';
import { MainPageComponent } from './components/main-page.component';
import { ItemPageComponent } from './components/item-page.component';
import { ListComponent } from './components/list.component';
import { NotFoundComponent } from './components/not-found.component';
import { MovieItemService } from './services/movieitem.service';
import { MoviesService } from './services/movies.service';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ItemPageComponent,
    MainPageComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    routing,
    AngularMaterialModule
  ],
  providers: [
    ApiService,
    MoviesService,
    MovieItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
