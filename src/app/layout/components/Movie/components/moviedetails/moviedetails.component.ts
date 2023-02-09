import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SharedService } from 'src/app/shared/services/shared.service';
import { MovieCast, MovieTrailers } from 'src/app/shared/model/movie';

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
  movieTrailers: MovieTrailers[] = [];
  movieCast: MovieCast[] = [];
  isTrailer: boolean = false;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _SharedService: SharedService,
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
        items: 3,
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
    this._SharedService.getTrailers('movie',movie_id).subscribe((res) => {
      this.movieTrailers = res.results;
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
        }
      });
    });
  }

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params.id;
    this.term = this._ActivatedRoute.snapshot.params.term;

    this._SharedService.getDetails('movie',this.id).subscribe((res) => {
      this.movieDetails = res;
    });

    this._SharedService
      .getCast('movie',Number(this.id))
      .subscribe((res) => {
        this.movieCast = res.cast;
      });

    this.getMovieTrailer(Number(this.id));
  }
}
