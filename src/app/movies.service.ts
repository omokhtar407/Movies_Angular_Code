import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private _HttpClient:HttpClient) { }

  getTrending(mediaType:string,page:number):Observable<any>{
    return  this._HttpClient.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=c0d379e9b2fca29da7e3e39703976bc5&page=${page}`)
  }
  getMovieDetails(id:string,term:string):Observable<any>{
    return  this._HttpClient.get(`https://api.themoviedb.org/3/${term}/${id}?api_key=c0d379e9b2fca29da7e3e39703976bc5&language=en-US`)
  }


  getMoviesTypes(mediaType:string):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/movie/${mediaType}?api_key=c0d379e9b2fca29da7e3e39703976bc5&language=en-US&page=1`)
  }
  getMoviesTypesDetails(id:string):Observable<any>{
    return  this._HttpClient.get(`https://api.themoviedb.org/3/movie/${id}?api_key=c0d379e9b2fca29da7e3e39703976bc5&language=en-US`)
  }

  getMovie(movie_id:number):Observable<any>{
    return  this._HttpClient.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=c0d379e9b2fca29da7e3e39703976bc5&language=en-US`)
  }

  getMovieTrailers(movie_id:number ):Observable<any>{
    return  this._HttpClient.get(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=c0d379e9b2fca29da7e3e39703976bc5&language=en-US`)
  }

  getMovieCrew_Cast(movie_id:number ):Observable<any>{
    return  this._HttpClient.get(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=c0d379e9b2fca29da7e3e39703976bc5&language=en-US`)
  }
}
