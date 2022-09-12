import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MoviesService } from '../movies.service';

// for using jQuery
declare var $:any;
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
  movieTrailers:any[]=[];
  isTrailer:boolean = false;

  constructor(private _ActivatedRoute:ActivatedRoute ,private _MoviesService:MoviesService ,private _NgxSpinnerService:NgxSpinnerService) { }

  getMovieTrailer(movie_id:number):void{
    this._MoviesService.getMovieTrailers(movie_id).subscribe((response) => {
      this.movieTrailers = response.results;
      this.isTrailer = true;
      this.movieTrailers.forEach((trailer) => {
        if(trailer.key){
          this.isTrailer = false;
          let VideoKey = trailer.key;
          let Trailer_container:any = document.querySelector('.Trailer_container');
          Trailer_container.innerHTML = `<iframe width="100%" height="400"
                                            src="https://www.youtube.com/embed/${VideoKey}"
                                            title="YouTube video player" frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write;
                                            encrypted-media; gyroscope; picture-in-picture"
                                            allowfullscreen>
                                        </iframe>`;
          this._NgxSpinnerService.hide();
        }
      });
    })
  }

  ngOnInit(): void {

    this._NgxSpinnerService.show();
    this.id = this._ActivatedRoute.snapshot.params.id;
    this.term = this._ActivatedRoute.snapshot.params.term;

    this._MoviesService.getMovieDetails(this.id,this.term).subscribe((response)=>{
      this.movieDetails =response;
      this._NgxSpinnerService.hide();
    });

    this._MoviesService.getMoviesTypesDetails(this.id).subscribe((response)=>{
      this.movieDetails =response;
      this._NgxSpinnerService.hide();
    });

    (error:any)=>{
      this._NgxSpinnerService.hide();
    };

    this.getMovieTrailer(Number(this.id));
  }

}
