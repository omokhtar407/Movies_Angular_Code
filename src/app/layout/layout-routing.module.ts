import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CastDetailsComponent } from './components/Cast/components/cast-details/cast-details.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { MoviedetailsComponent } from './components/Movie/components/moviedetails/moviedetails.component';
import { MoviesComponent } from './components/Movie/components/movies/movies.component';
import { TvComponent } from './components/Tv/components/tv/tv.component';
import { TvdetailsComponent } from './components/Tv/components/tvdetails/tvdetails.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'moviedetails/:id/:term', component: MoviedetailsComponent },
  { path: 'moviedetails/:id', component: MoviedetailsComponent },
  { path: 'tv', component: TvComponent },
  { path: 'tvdetails/:id', component: TvdetailsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'castDetails/:id/:gender', component: CastDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
