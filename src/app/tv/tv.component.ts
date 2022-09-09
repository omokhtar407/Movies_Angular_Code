import { TvService } from './../tv.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {

  totalPages: number = 1;
  visablePages: any[] = [];
  currentPage: number = 1;
  terms: string = "";
  trendingTV: any[] = [];
  imgPrefx: string = "https://image.tmdb.org/t/p/w500";
  constructor(private _TvService: TvService ,private _NgxSpinnerService:NgxSpinnerService) { }

  searchForm: FormGroup = new FormGroup({
    "term": new FormControl(null, [Validators.pattern(/^((?!(<|>)).)+$/)])
  })

  search(searchForm: FormGroup) {
      this.terms = searchForm.controls.term.value;
  }



  getMovies(page: number) {
    this._NgxSpinnerService.show();
    this.currentPage = page;
    this._TvService.getTrending("tv", page).subscribe((response) => {
      this.trendingTV = response.results;
      this.totalPages = response.total_pages;
      this._NgxSpinnerService.hide();
      this.setPages();
    });
    (error:any)=>{
      this._NgxSpinnerService.hide();
    };

  }

  setPages() {
    if (this.currentPage == 1) {
      if (this.totalPages == 1) {
        this.visablePages = [1];
      }
      else if (this.totalPages == 2) {
        this.visablePages = [1, 2];
      }
      else {
        this.visablePages = [1, 2, 3];
      }
    }
  }

  changePage(term: any) {
    if (term == "next" && this.visablePages.includes(this.totalPages) == false) {
      this.visablePages.forEach((part, index) => { this.visablePages[index]++ });
      this.getMovies(this.currentPage + 1);
    }
    else if (term == "prev" && this.visablePages[0] > 1) {
      this.visablePages.forEach((part, index) => { this.visablePages[index]-- })
      this.getMovies(this.currentPage - 1);
    }
    else if (term == "prev" && this.currentPage > 1) {
      this.getMovies(this.currentPage - 1);
    }
    else if (term == "next" && this.currentPage < this.totalPages) {
      this.getMovies(this.currentPage + 1);
    }
  }

  getCurrentPage(page: number) {
    this.currentPage = page;
    this.getMovies(page);
  }

  ngOnInit(): void {
    this._NgxSpinnerService.show();
    this.getMovies(this.currentPage);
  }

}
