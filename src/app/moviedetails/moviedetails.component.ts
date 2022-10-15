import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MoviesService } from '../movies.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

// for using jQuery
declare var $: any;
@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css'],
})
export class MoviedetailsComponent implements OnInit {
  id: string = '';
  term: string = '';
  movieDetails: any = {};
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/';
  placeholder: string = 'https://via.placeholder.com/150';
  movieTrailers: any[] = [];
  movieCast:any[] = [];
  isTrailer: boolean = false;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _MoviesService: MoviesService,
    private _NgxSpinnerService: NgxSpinnerService
  ) {}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    nav: true,
    navText: [
      '<i class="fas fa-angle-left" style="font-size:25px; font-style:italic;" ></i>',
      '<i class="fas fa-angle-right" style="font-size:25px; font-style:italic;"></i>',
    ],
    margin: 10,
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items:3 ,
      },
      740: {
        items: 5,
      },
      940: {
        items: 6,
      },
    },
  };

  getMovieTrailer(movie_id: number): void {
    this._MoviesService.getMovieTrailers(movie_id).subscribe((response) => {
      this.movieTrailers = response.results;
      this.isTrailer = true;
      this.movieTrailers.forEach((trailer) => {
        if (trailer.key) {
          this.isTrailer = false;
          let VideoKey = trailer.key;
          let Trailer_container: any =
            document.querySelector('.Trailer_container');
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
    });
  }

  ngOnInit(): void {
    this._NgxSpinnerService.show();
    this.id = this._ActivatedRoute.snapshot.params.id;
    this.term = this._ActivatedRoute.snapshot.params.term;

    this._MoviesService
      .getMovieDetails(this.id, this.term)
      .subscribe((response) => {
        this.movieDetails = response;
        this._NgxSpinnerService.hide();
      });

    this._MoviesService.getMoviesTypesDetails(this.id).subscribe((response) => {
      this.movieDetails = response;
      this._NgxSpinnerService.hide();
    });

    this._MoviesService.getMovieCrew_Cast(Number(this.id)).subscribe((response) => {
      this.movieCast = response.cast;
      this._NgxSpinnerService.hide();
    });

    (error: any) => {
      this._NgxSpinnerService.hide();
    };

    this.getMovieTrailer(Number(this.id));
  }
}
