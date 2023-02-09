import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private _HttpClient:HttpClient) { }

  /* Shared Component */
    getTrending(type:string,page:number):Observable<any>{
      return  this._HttpClient.get(environment.baseUrl + `trending/${type}/day?api_key=${environment.apiKey}&page=${page}`)
    }

    getDetails(type:string,id:string):Observable<any>{
      return  this._HttpClient.get(environment.baseUrl + `${type}/${id}?api_key=${environment.apiKey}&language=en-US`)
    }

    getTrailers(type:string,id:number ):Observable<any>{
      return  this._HttpClient.get(environment.baseUrl + `${type}/${id}/videos?api_key=${environment.apiKey}&language=en-US`)
    }

    getCast(type:string,id:number ):Observable<any>{
      return  this._HttpClient.get(environment.baseUrl + `${type}/${id}/credits?api_key=${environment.apiKey}&language=en-US`)
    }
  /* End */
}
