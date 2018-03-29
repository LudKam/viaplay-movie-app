import { Component, Input, SimpleChanges, OnChanges, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Movie } from "../services/movie.model";
import { MovieItemService } from "../services/movieitem.service";

/**
 * Creates the grid list and populates it with the input data,
 * and also routes to item-page
 * @Input is the data that shall be showed, aka movies for a specific genre
 */
@Component({
    selector: 'list',
    templateUrl: '../view/list.component.html',
    styleUrls: ['../view/list.component.sass'],
})
export class ListComponent{

    @Input() data: Array<Movie>;

    items: Array<Movie>;

    constructor(private movieItemService: MovieItemService, private router: Router) {}

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges){
        if(changes['data']){
            this.items = this.data;
        }
    }

    showMovie(index: number, movie: string){
        this.movieItemService.currentMovie = index;
        this.router.navigate(['/film', movie]);
    }

}