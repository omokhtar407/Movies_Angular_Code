import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit {

  id:string = '';
  term:string='';
  movieDetails:any={};
  imgPrefix:string='https://image.tmdb.org/t/p/w500/';

  constructor(private _ActivatedRoute:ActivatedRoute ,private _MoviesService:MoviesService ,private _NgxSpinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params.id;
    this.term = this._ActivatedRoute.snapshot.params.term;

    this._MoviesService.getMovieDetails(this.id,this.term).subscribe((response)=>{
      this.movieDetails =response
    });

    this._MoviesService.getMoviesTypesDetails(this.id).subscribe((response)=>{
      this.movieDetails =response
    });

    this._NgxSpinnerService.show();
    setTimeout(()=>{
      this._NgxSpinnerService.hide();
    },700);
  }

}
