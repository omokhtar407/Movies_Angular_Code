import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  constructor(private _HttpClient:HttpClient) { }
  getTrending(mediaType:string,page:number):Observable<any>{
    return  this._HttpClient.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=c0d379e9b2fca29da7e3e39703976bc5&page=${page}`)
  }
  getTvDetails(id:string):Observable<any>{
    return  this._HttpClient.get(`https://api.themoviedb.org/3/tv/${id}?api_key=c0d379e9b2fca29da7e3e39703976bc5&language=en-US`)
  }
}
