import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { TvService } from './../tv.service';
import { Component, OnInit } from '@angular/core';

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
  isTrailer: boolean = false;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _TvService: TvService,
    private _NgxSpinnerService: NgxSpinnerService
  ) {}

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
          this._NgxSpinnerService.hide();
        }
      });
    });
  }

  ngOnInit(): void {
    this._NgxSpinnerService.show();

    this.id = this._ActivatedRoute.snapshot.params.id;

    this._TvService.getTvDetails(this.id).subscribe((response) => {
      this.tvDetails = response;
      this._NgxSpinnerService.hide();
    });

    (error: any) => {
      this._NgxSpinnerService.hide();
    };

    this.getTvTrailer(Number(this.id));
  }
}
