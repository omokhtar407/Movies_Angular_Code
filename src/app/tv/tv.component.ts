import { TvService } from './../tv.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css'],
})
export class TvComponent implements OnInit {
  totalPages: number = 1;
  visiblePages: any[] = [];
  currentPage: number = 1;
  terms: string = '';
  trendingTV: any[] = [];
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500';
  placeholder: string = 'https://via.placeholder.com/150';
  constructor(
    private _TvService: TvService
  ) {}

  searchForm: FormGroup = new FormGroup({
    term: new FormControl(null, [Validators.pattern(/^((?!(<|>)).)+$/)]),
  });

  search(searchForm: FormGroup) {
    this.terms = searchForm.controls.term.value;
  }

  getMovies(page: number) {
    this.currentPage = page;
    this._TvService.getTrending('tv', page).subscribe((response) => {
      this.trendingTV = response.results;
      this.totalPages = response.total_pages;
      this.setPages();
    });
  }

  setPages() {
    if (this.currentPage == 1) {
      if (this.totalPages == 1) {
        this.visiblePages = [1];
      } else if (this.totalPages == 2) {
        this.visiblePages = [1, 2];
      } else {
        this.visiblePages = [1, 2, 3];
      }
    }
  }

  changePage(term: any) {
    if (
      term == 'next' &&
      this.visiblePages.includes(this.totalPages) == false
    ) {
      this.visiblePages.forEach((part, index) => {
        this.visiblePages[index]++;
      });
      this.getMovies(this.currentPage + 1);
    } else if (term == 'prev' && this.visiblePages[0] > 1) {
      this.visiblePages.forEach((part, index) => {
        this.visiblePages[index]--;
      });
      this.getMovies(this.currentPage - 1);
    } else if (term == 'prev' && this.currentPage > 1) {
      this.getMovies(this.currentPage - 1);
    } else if (term == 'next' && this.currentPage < this.totalPages) {
      this.getMovies(this.currentPage + 1);
    }
  }

  getCurrentPage(page: number) {
    this.currentPage = page;
    this.getMovies(page);
  }

  ngOnInit(): void {
    this.getMovies(this.currentPage);
  }
}
