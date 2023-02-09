import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Movie } from 'src/app/shared/model/movie';
import { SharedService } from 'src/app/shared/services/shared.service';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  totalPages: number = 1;
  visiblePages: number[] = [];
  currentPage: number = 1;
  terms: string = '';
  trendingMovies: Movie[] = [];
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500';
  placeholder: string = 'https://via.placeholder.com/150';
  constructor(private _SharedService: SharedService) {}

  searchForm: FormGroup = new FormGroup({
    term: new FormControl(null, [Validators.pattern(/^((?!(<|>)).)+$/)]),
  });

  search(searchForm: FormGroup) {
    this.terms = searchForm.controls.term.value;
  }

  getAllMovies(page: number) {
    this.currentPage = page;
    this._SharedService.getTrending('movie',page).subscribe((res) => {
      this.trendingMovies = res.results;
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
      this.getAllMovies(this.currentPage + 1);
    } else if (term == 'prev' && this.visiblePages[0] > 1) {
      this.visiblePages.forEach((part, index) => {
        this.visiblePages[index]--;
      });
      this.getAllMovies(this.currentPage - 1);
    } else if (term == 'prev' && this.currentPage > 1) {
      this.getAllMovies(this.currentPage - 1);
    } else if (term == 'next' && this.currentPage < this.totalPages) {
      this.getAllMovies(this.currentPage + 1);
    }
  }

  getCurrentPage(page: number) {
    this.currentPage = page;
    this.getAllMovies(page);
  }

  ngOnInit(): void {
    this.getAllMovies(this.currentPage);
  }
}