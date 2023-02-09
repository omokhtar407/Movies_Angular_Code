import { Movie } from 'src/app/shared/model/movie';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SharedService } from 'src/app/shared/services/shared.service';
import { HomeService } from '../../services/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  trendingMovies: Movie[] = [];
  nowPlaying: Movie[] = [];
  upComing: Movie[] = [];
  popular: Movie[] = [];
  topRated: Movie[] = [];
  placeholder: string = 'https://via.placeholder.com/150';
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/';
  constructor(private _HomeService:HomeService,private _SharedService:SharedService) {}

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
    this._SharedService.getTrending('movie',1).subscribe((res) => {
      this.trendingMovies = res.results;
    });

    this._HomeService.getMoviesTypes('now_playing').subscribe((res) => {
      this.nowPlaying = res.results;
    });

    this._HomeService.getMoviesTypes('popular').subscribe((res) => {
      this.popular = res.results;
    });

    this._HomeService.getMoviesTypes('top_rated').subscribe((res) => {
      this.topRated = res.results;
    });

    this._HomeService.getMoviesTypes('upcoming').subscribe((res) => {
      this.upComing = res.results;
    });
  }
}
