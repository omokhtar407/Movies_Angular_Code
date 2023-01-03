
import { ActivatedRoute } from '@angular/router';
import { TvService } from './../tv.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-tvdetails',
  templateUrl: './tvdetails.component.html',
  styleUrls: ['./tvdetails.component.css'],
})
export class TvdetailsComponent implements OnInit {
  id: string = '';
  term: string = '';
  tvDetails: any = {};
  nowPlaying: any[] = [];
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/';
  placeholder: string = 'https://via.placeholder.com/150';
  tvTrailers: any[] = [];
  tvCast:any[] = [];
  isTrailer: boolean = false;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _TvService: TvService
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

  getTvTrailer(tv_id: number): void {
    this._TvService.getTvTrailers(tv_id).subscribe((response) => {
      this.tvTrailers = response.results;
      this.isTrailer = true;
      this.tvTrailers.forEach((trailer) => {
        if (trailer.key) {
          let VideoKey = trailer.key;
          this.isTrailer = false;
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

    this._TvService.getTvDetails(this.id).subscribe((response) => {
      this.tvDetails = response;
    });

    this._TvService.getTvCrew_Cast(Number(this.id)).subscribe((response) => {
      this.tvCast = response.cast;
    });

    this.getTvTrailer(Number(this.id));
  }
}
