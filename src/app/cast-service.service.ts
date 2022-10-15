import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CastServiceService {

  constructor(private _HttpClient:HttpClient) { }

  getCastInfo(cast_id:number):Observable<any>{
    return  this._HttpClient.get(`https://api.themoviedb.org/3/person/${cast_id}?api_key=c0d379e9b2fca29da7e3e39703976bc5&language=en-US`)
  }

  getCastMovies(cast_id:number):Observable<any>{

    return  this._HttpClient.get(`https://api.themoviedb.org/3/person/${cast_id}/movie_credits?api_key=c0d379e9b2fca29da7e3e39703976bc5&language=en-US`)
  }

}
