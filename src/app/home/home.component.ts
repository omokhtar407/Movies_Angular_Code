import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  trendingMovies:any[]=[];
  nowPlaying:any[]=[];
  upComing:any[]=[];
  popular:any[]=[];
  topRated:any[]=[];


  imgPrefix:string='https://image.tmdb.org/t/p/w500/';
  constructor(private _MoviesService:MoviesService) { }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    nav:true,
    navText: [ '<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>' ],
    margin:10,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },

  }

  ngOnInit(): void {
    this._MoviesService.getTrendingMovies().subscribe((respons)=>{
      this.trendingMovies = respons.results;
    });

    this._MoviesService.getMoviesTypes('now_playing').subscribe((respons)=>{
      this.nowPlaying = respons.results;
    });

    this._MoviesService.getMoviesTypes('popular').subscribe((respons)=>{
      this.popular = respons.results;
    });

    this._MoviesService.getMoviesTypes('top_rated').subscribe((respons)=>{
      this.topRated = respons.results;
    });

    this._MoviesService.getMoviesTypes('upcoming').subscribe((respons)=>{
      this.upComing = respons.results;
    });
  }

}
