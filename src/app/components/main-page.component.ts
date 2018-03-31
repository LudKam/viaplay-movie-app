import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';

import { ApiService } from '../services/api.service';
import { MoviesService } from '../services/movies.service';
import { MovieItemService } from '../services/movieitem.service';
import { Category, Movie, Images, Imdb, CATEGORY_NAV } from "../services/movie.model";

/**
 * Creates the firstpage-movie-list by using the list component, collects data from
 * the movies service
 * TODO: Implement filtering buttons and finetune scroll-loading
 */
@Component({
  selector: 'main-page',
  templateUrl: '../view/main-page.component.html',
  styleUrls: ['../view/main-page.component.sass']
})
export class MainPageComponent {

  private apiService: ApiService | null;

  isLoading: boolean;
  isError: boolean;
  data: Array<Movie>;
  category: Array<Category>;
  currentCategory: Category;
  selectedCategory: string;

  constructor(private http: HttpClient, private moviesService: MoviesService,
    private movieItemService: MovieItemService, private router: Router) {
    this.apiService = new ApiService(this.http);
  }

  ngOnInit() {
    this.category = CATEGORY_NAV;
    this.currentCategory = this.movieItemService.currentGenre;
    this.selectedCategory = this.currentCategory.name;

    this.changeBackgroundImage(this.movieItemService.currentGenre.id);

    this.moviesService.isLoading.subscribe(data => this.isLoading = data);
    this.moviesService.isError.subscribe(data => this.isError = data);
    this.moviesService.movies.subscribe(data => this.data = data);

    if(this.data.length == 0)
      this.moviesService.getCategoryMovies(this.category[0].url);
  }

  changeGenre() {
    this.category.forEach(element => {
      if (element.name == this.selectedCategory) {
        this.changeBackgroundImage(element.id);
        this.currentCategory = element; 
        this.movieItemService.currentGenre = element;
        this.movieItemService.currentMovie = 0;
        this.moviesService.getCategoryMovies(element.url);
      }
    });
  }

  private changeBackgroundImage(name: string) {
    document.body.className = name;
  }

  onScroll() {
    this.moviesService.getNextPage();
  }

  showMovie(index: number) {
    this.movieItemService.currentMovie = index;
    this.router.navigate(['/film', this.data[index].path]);
  }

  errorFetch(){
    this.moviesService.setError(false);
    this.moviesService.getCategoryMovies(this.currentCategory.url);
  }

  /**
   * Based on shunryu111:s answer at 
   * https://stackoverflow.com/questions/12199363/scrollto-with-animation
   */
  scrollTop(distance: number = 100, duration: number = 3000) {
    var initialY = document.body.scrollTop;
    var y = initialY + distance;
    var baseY = (initialY + y) * 0.5;
    var difference = initialY - baseY;
    var startTime = performance.now();

    function step() {
      var normalizedTime = (performance.now() - startTime) / duration;
      if (normalizedTime > 1) normalizedTime = 1;

      window.scrollTo(0, initialY * Math.cos(normalizedTime * Math.PI));
      if (normalizedTime < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  showScrollToTop(): boolean{
    return document.body.scrollTop > 10
  }
}