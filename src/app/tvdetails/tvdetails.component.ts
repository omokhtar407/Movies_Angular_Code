import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { TvService } from './../tv.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tvdetails',
  templateUrl: './tvdetails.component.html',
  styleUrls: ['./tvdetails.component.css']
})
export class TvdetailsComponent implements OnInit {

  id:string = '';
  term:string='';
  tvDetails:any={};
  nowPlaying:any[]=[];
  imgPrefix:string='https://image.tmdb.org/t/p/w500/';

  constructor(private _ActivatedRoute:ActivatedRoute ,private _TvService:TvService ,private _NgxSpinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    this._NgxSpinnerService.show();

    this.id = this._ActivatedRoute.snapshot.params.id;

    this._TvService.getTvDetails(this.id).subscribe((response)=>{
      this.tvDetails =response;
      console.log(this.tvDetails)
      this._NgxSpinnerService.hide();
    });

    (error:any)=>{
      this._NgxSpinnerService.hide();
    };
  }

}
