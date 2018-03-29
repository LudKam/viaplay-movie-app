import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './components/app.component';
import { ItemPageComponent } from './components/item-page.component';
import { MainPageComponent } from './components/main-page.component';
import { NotFoundComponent } from './components/not-found.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'film/:id', component: ItemPageComponent },
    { path: '**', component: NotFoundComponent },
];

export const routing = RouterModule.forRoot(routes);