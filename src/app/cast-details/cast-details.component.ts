import { CastServiceService } from './../cast-service.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-cast-details',
  templateUrl: './cast-details.component.html',
  styleUrls: ['./cast-details.component.css']
})
export class CastDetailsComponent implements OnInit {

  castId: string = '';
  castInfo: any = {};
  castMovies: any[] = [];
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/';
  placeholder: string = 'https://via.placeholder.com/150';
  castGender:number = 0;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _CastServiceService: CastServiceService,
    private _NgxSpinnerService: NgxSpinnerService
  ) { }

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

  ngOnInit(): void {
    this._NgxSpinnerService.show();

    this.castId = this._ActivatedRoute.snapshot.params.id;
    this.castGender = this._ActivatedRoute.snapshot.params.gender;

    this._CastServiceService.getCastInfo(Number(this.castId)).subscribe((response) => {
      this.castInfo = response;
      this._NgxSpinnerService.hide();
    });


    this._CastServiceService.getCastMovies(Number(this.castId)).subscribe((response) => {
      this.castMovies = response.cast;
      this._NgxSpinnerService.hide();
    });

    (error: any) => {
      this._NgxSpinnerService.hide();
    };
  }

}
