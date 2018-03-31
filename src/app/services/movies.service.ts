import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { merge } from "rxjs/observable/merge";
import { startWith } from "rxjs/operators/startWith";
import { switchMap } from "rxjs/operators/switchMap";
import { map } from "rxjs/operators/map";
import { catchError } from "rxjs/operators/catchError";

import { ApiService } from "./api.service";
import { Movie, Images, Imdb } from "./movie.model"

/**
 * Service that retrieves data (from api) and parses the movie list for a specific genre
 * Letting interested components subscribe to the data
 */
@Injectable()
export class MoviesService {

    private api: ApiService | null;

    private moviesSource: BehaviorSubject<Array<Movie>>;
    movies;

    private isLoadingSource: BehaviorSubject<boolean>;
    isLoading;

    private isErrorSource: BehaviorSubject<boolean>;
    isError;

    private nextPage;
    private lastPage;
    private url;

    constructor(private http: HttpClient) {
        this.api = new ApiService(this.http);

        this.moviesSource = new BehaviorSubject<Array<Movie>>([]);
        this.movies = this.moviesSource.asObservable();

        this.isLoadingSource = new BehaviorSubject<boolean>(true);
        this.isLoading = this.isLoadingSource.asObservable();

        this.isErrorSource = new BehaviorSubject<boolean>(false);
        this.isError = this.isErrorSource.asObservable();
    }

    public getMovie(id: number): Movie{
        return this.moviesSource.getValue()[id];
    }

    public getNumberOfMovies(): number{
        return this.moviesSource.getValue().length;
    }

    public getCategoryMovies(url: string) {
        this.url = url;
        this.nextPage = 1;
        this.lastPage = null;
        this.moviesSource.next([]);
        this.fetch()
    }

    public getNextPage(){
        if(!this.isLoading){
            if(this.url != null && this.lastPage != null && this.nextPage <= this.lastPage){
                this.fetch();
            }
        }
    }

    public pagesLeft(): boolean{
        return this.nextPage <= this.lastPage;
    }

    public setError(isError: boolean){
        this.isErrorSource.next(isError);
    }

    /**
     * Get data from api, parse it, handle error and loading and make it subscribable
     */
    private fetch(){
        merge()
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoadingSource.next(true);
                    this.isErrorSource.next(false);
                    return this.api.getMoviePage(this.url, this.nextPage);
                }),
                map(data => {
                    var result = this.parseResponse(data);             
                    this.lastPage = data.pageCount;
                    this.isLoadingSource.next(false);
                    this.nextPage++;
                    return result;
                }),
                catchError(data => {
                    this.isLoadingSource.next(false);
                    this.isErrorSource.next(true);
                    return [];
                })
            ).subscribe(data => {
                var he = <Array<Movie>>data;
                this.moviesSource.next(this.movies.source._value.concat(data));
            });
    }

    /**
     * Make the retrieved data nicer to work with by putting it in namespace classes
     * @param data data from the api
     */
    private parseResponse(data: any): Array<Movie>{
        var result = new Array<Movie>();

        data._embedded['viaplay:products'].forEach(val => {
            var movie = new Movie();
            var images = new Images();
            var imdb = new Imdb();
            var genres = new Array<string>();

            images = {
                boxart: val.content.images.boxart.url,
                packshot: val.content.images.packshot.url,
                landscape: val.content.images.landscape.url
            }

            if (val.content.imdb != null) {
                imdb = {
                    rating: val.content.imdb.rating,
                    votes: val.content.imdb.votes
                }
            }

            if (val._links['viaplay:genres'] != null) {
                val._links['viaplay:genres'].forEach(gen => {
                    genres.push(gen.title);
                });
            }

            movie = {
                path: val.publicPath,
                duration: val.content.duration.readable,
                images: images,
                directors: val.content.people.directors,
                actors: val.content.people.actors,
                country: val.content.production.country,
                year: val.content.production.year,
                imdb: imdb,
                genres: genres,
                synopsis: val.content.synopsis,
                title: val.content.title
            }

            result.push(movie);
        });

        return result;
    }

}