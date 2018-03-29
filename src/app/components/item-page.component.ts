import { Component } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { trigger, keyframes, animate, transition } from "@angular/animations";

import { Observable } from 'rxjs/Observable';

import { MoviesService } from "../services/movies.service";
import { Movie, CATEGORY_NAV } from "../services/movie.model";
import { MovieItemService } from "../services/movieitem.service";

import * as kf from "../services/keyframes";

/**
 * Shows more info about movies for a specific genre. Done in a carousel manner,
 * where the data is stored in a shared service
 */
@Component({
    selector: 'item-page',
    templateUrl: '../view/item-page.component.html',
    styleUrls: ['../view/item-page.component.sass'],
    animations: [
        trigger('cardAnimator', [
            transition('* => pulse', animate(700, keyframes(kf.pulse))),
        ])
    ]
})

export class ItemPageComponent {

    item: Movie;
    currentId: number;
    nextId: number;
    previousId: number;
    image;
    animationState: string;

    constructor(private route: ActivatedRoute, private router: Router,
        private moviesService: MoviesService, private movieItemService: MovieItemService,
        private sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                this.sanityCheck(params);
            });
    }

    /**
     * Decide the current, next and previous values. Fetch more data if needed
     * @param params the url input
     */
    private sanityCheck(params: any) {
        if (this.movieItemService.currentMovie != null) {
            this.currentId = this.movieItemService.currentMovie;
            this.nextId = this.currentId + 1;
            this.previousId = this.currentId - 1;

            this.infiniteNavigation();
            this.item = this.moviesService.getMovie(this.currentId);
            if (this.item == null) return;

            this.sanityCheckParam(params);

            this.image = this.sanitizer.bypassSecurityTrustStyle(`url(${this.item.images.landscape})`);
        } else {
            // - TODO, fetch the movie from server
            this.ngOnDestroy();
            this.router.navigate(['/filmer/' + params['id']]);
        }
    }

    /**
     * Controll what to do when the url path and the movie list path are diffrent, 
     * and accordangly decide current, next and previous values.
     * @param params the url input
     */
    private sanityCheckParam(params: any) {
        if (params['id'] != this.item.path) {
            if (this.previousId >= 0 &&
                params['id'] == this.moviesService.getMovie(this.previousId).path) {
                this.nextId = this.currentId;
                this.currentId = this.previousId;
                this.previousId = this.previousId - 1;
            } else if (params['id'] == this.moviesService.getMovie(this.nextId).path) {
                this.previousId = this.currentId;
                this.currentId = this.nextId;
                this.nextId = this.nextId + 1;
            } else {
                this.ngOnDestroy();
                this.router.navigate(['../']);
            }
            this.movieItemService.currentMovie = this.currentId;
            this.item = this.moviesService.getMovie(this.currentId);
        }
    }

    /**
     * Fetch data if the list will be empty soon and if the server got it. 
     * Store it in the movie service for easy reuse.
     */
    private infiniteNavigation() {
        if (this.nextId == this.moviesService.getNumberOfMovies() && this.moviesService.pagesLeft())
            this.moviesService.getNextPage();
        else if (this.nextId == this.moviesService.getNumberOfMovies())
            this.nextId = 0
        else if (this.currentId + 3 > this.moviesService.getNumberOfMovies())
            this.moviesService.getNextPage();
    }

    next() {
        this.startAnimation('pulse');
        this.movieItemService.currentMovie = this.nextId;
        this.router.navigate(['/film', this.moviesService.getMovie(this.nextId).path]);
    }

    previous() {
        if (this.previousId >= 0) {
            this.startAnimation('pulse');
            this.movieItemService.currentMovie = this.previousId;
            this.router.navigate(['/film', this.moviesService.getMovie(this.previousId).path]);
        }
    }

    getGenreColor(name: string = null): string {
        if (name == null) {
            return this.movieItemService.currentGenre.id;
        } else {
            let color = CATEGORY_NAV[0].id;
            CATEGORY_NAV.forEach(element => {
                if (element.name == name)
                    color = element.id;
            });
            return color;
        }
    }

    startAnimation(state) {
        if (!this.animationState)
            this.animationState = state;
    }

    resetAnimationState() {
        this.animationState = '';
    }

    ngOnDestroy() {
        this.movieItemService.currentMovie = 0;
    }
}