import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  trendingMovies: any[] = [];
  nowPlaying: any[] = [];
  upComing: any[] = [];
  popular: any[] = [];
  topRated: any[] = [];
  placeholder: string = 'https://via.placeholder.com/150';
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/';
  constructor(
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
        items: 1,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
  };

  ngOnInit(): void {
    this._NgxSpinnerService.show();

    this._MoviesService.getTrending('movie', 1).subscribe((response) => {
      this.trendingMovies = response.results;
      this._NgxSpinnerService.hide();
    });

    this._MoviesService.getMoviesTypes('now_playing').subscribe((response) => {
      this.nowPlaying = response.results;
      this._NgxSpinnerService.hide();
    });

    this._MoviesService.getMoviesTypes('popular').subscribe((response) => {
      this.popular = response.results;
      this._NgxSpinnerService.hide();
    });

    this._MoviesService.getMoviesTypes('top_rated').subscribe((response) => {
      this.topRated = response.results;
      this._NgxSpinnerService.hide();
    });

    this._MoviesService.getMoviesTypes('upcoming').subscribe((response) => {
      this.upComing = response.results;
      this._NgxSpinnerService.hide();
    });
    (error: any) => {
      this._NgxSpinnerService.hide();
    };
  }
}
