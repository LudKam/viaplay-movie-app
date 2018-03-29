import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";

import { environment } from "../../environments/environment";

/**
 * Handles all http requests
 */
@Injectable()
export class ApiService{
    _baseUrlMovies = environment.baseUrlMovies;

    constructor(private http: HttpClient){}

    getMoviePage(url: string, page: number): Observable<any>{
        return this.http
            .get<any>(this._baseUrlMovies + url + page)
    }
}