import { TvService } from '../../services/tv.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Tv } from 'src/app/shared/model/tv';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css'],
})
export class TvComponent implements OnInit {
  totalPages: number = 1;
  visiblePages: number[] = [];
  currentPage: number = 1;
  terms: string = '';
  trendingTV: Tv[] = [];
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500';
  placeholder: string = 'https://via.placeholder.com/150';
  constructor(private _SharedService: SharedService) {}

  searchForm: FormGroup = new FormGroup({
    term: new FormControl(null, [Validators.pattern(/^((?!(<|>)).)+$/)]),
  });

  search(searchForm: FormGroup) {
    this.terms = searchForm.controls.term.value;
  }

  getAllTv(page: number) {
    this.currentPage = page;
    this._SharedService.getTrending('tv',page).subscribe((res) => {
      this.trendingTV = res.results;
      this.totalPages = res.total_pages;
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

  changePage(term: string) {
    if (
      term == 'next' &&
      this.visiblePages.includes(this.totalPages) == false
    ) {
      this.visiblePages.forEach((part, index) => {
        this.visiblePages[index]++;
      });
      this.getAllTv(this.currentPage + 1);
    } else if (term == 'prev' && this.visiblePages[0] > 1) {
      this.visiblePages.forEach((part, index) => {
        this.visiblePages[index]--;
      });
      this.getAllTv(this.currentPage - 1);
    } else if (term == 'prev' && this.currentPage > 1) {
      this.getAllTv(this.currentPage - 1);
    } else if (term == 'next' && this.currentPage < this.totalPages) {
      this.getAllTv(this.currentPage + 1);
    }
  }

  getCurrentPage(page: number) {
    this.currentPage = page;
    this.getAllTv(page);
  }

  ngOnInit(): void {
    this.getAllTv(this.currentPage);
  }
}
