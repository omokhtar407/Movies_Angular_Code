import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MoviesService } from './../movies.service';
import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare var $: any;
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  trendingMovies: any[] = [];
  movieTrailers: any[] = [];
  firstMovies: any = {};
  Movie: any[] = [];
  isTrailer: boolean = false;
  placeholder: string = 'https://via.placeholder.com/150';
  @Input() headerTrendingMovies: any[] = [];

  movieId: number = 0;
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/';
  imgSrc: string = '';
  videoPrefix: string = `https://www.youtube.com/embed/`;
  videoSrc: string = '';
  movieTitle: string = '';
  movieReleasedDate: string = '';
  movieGenres: any[] = [];
  movieVote: number = 0;
  movieOverview: string = '';
  backGroundImg: string = '';

  constructor(
    public _MoviesService: MoviesService,
    public _ActivatedRoute: ActivatedRoute,
    public _Router: Router
  ) {}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    nav: false,
    margin: 10,
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 3,
      },
      740: {
        items: 5,
      },
      940: {
        items: 7,
      },
    },
  };

  getMovieId(id: number) {
    this.movieId = id;
    this.ShowMovie(this.movieId);
  }

  getMovieDetails(id: number) {
    this.Movie.forEach((movie) => {
      if (movie.id === id) {
        this.imgSrc = this.imgPrefix + movie.poster_path;
        this.movieTitle = movie.title ? movie.title : movie.name;
        this.movieReleasedDate = movie.release_date.split('-')[0];
        this.movieGenres = movie.genres;
        this.movieOverview = movie.overview;
        this.movieVote = movie.vote_average;
        this.backGroundImg = movie.backdrop_path;
        this.getMovieTrailer(id);
      }
    });
  }

  getMovieTrailer(movie_id: number) {
    this._MoviesService.getMovieTrailers(movie_id).subscribe((response) => {
      this.movieTrailers = response.results;

      if (this.movieTrailers.length) {
        this.movieTrailers.forEach((trailer) => {
          if (trailer.key) {
            this.isTrailer = false;
            this.videoSrc = this.videoPrefix + trailer.key;
            let Trailer: any = document.querySelector('.Trailer');
            Trailer.setAttribute('src', this.videoSrc);
          }
        });
      } else {
        this.isTrailer = true;
      }
    });
  }

  ShowMovie(id: number) {
    this._MoviesService.getMovie(id).subscribe(
      (response) => {
        this.Movie = [response];
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.getMovieDetails(id);
      }
    );
  }

  ActiveOwlSpan(event: any): void {
    $(event.target).addClass('owl_span_active');
    $(event.target)
      .parent()
      .parent()
      .siblings()
      .find('.owl_span')
      .removeClass('owl_span_active');
  }

  ngOnInit(): void {
    this._MoviesService.getTrending('movie', 1).subscribe((response) => {
      this.trendingMovies = response.results;
      this.firstMovies = this.trendingMovies[0];
      this.ShowMovie(this.firstMovies.id);
    });
  }
}
