import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _HttpClient:HttpClient) { }

  /* Home Component */
    getMoviesTypes(mediaType:string):Observable<any>{
      return this._HttpClient.get(`https://api.themoviedb.org/3/movie/${mediaType}?api_key=c0d379e9b2fca29da7e3e39703976bc5&language=en-US&page=1`)
    }

  /* End */
}
