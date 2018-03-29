import { Injectable } from "@angular/core";

import { Category, CATEGORY_NAV } from "./movie.model";

/**
 * Service mostly for the item-page component
 * TODO: add possibility to fetch specific movie from server
 */
@Injectable()
export class MovieItemService {
    currentMovie: number;
    currentGenre: Category;

    constructor(){
        this.currentGenre = CATEGORY_NAV[0];
    }
}