import { NgModule } from '@angular/core';

import {
    MatButtonModule, MatIconModule, MatSelectModule,
    MatProgressBarModule, MatProgressSpinnerModule
} from '@angular/material';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

/**
 * Importing modules that will be needed in every created module,
 * useful for when the app grows in size
 */
@NgModule({
    exports: [
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,

        InfiniteScrollModule
    ],
})
export class AngularMaterialModule { }