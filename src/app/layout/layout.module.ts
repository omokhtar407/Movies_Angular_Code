import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { MoviedetailsComponent } from './components/Movie/components/moviedetails/moviedetails.component';
import { ContactComponent } from './components/contact/contact.component';
import { MoviesComponent } from './components/Movie/components/movies/movies.component';
import { TvComponent } from './components/Tv/components/tv/tv.component';
import { TvdetailsComponent } from './components/Tv/components/tvdetails/tvdetails.component';
import { CastDetailsComponent } from './components/Cast/components/cast-details/cast-details.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    MoviedetailsComponent,
    MoviesComponent,
    TvComponent,
    TvdetailsComponent,
    ContactComponent,
    CastDetailsComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CarouselModule,
  ],
})
export class LayoutModule {}
