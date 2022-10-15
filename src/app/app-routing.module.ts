import { SliderComponent } from './slider/slider.component';
import { TvdetailsComponent } from './tvdetails/tvdetails.component';
import { MoviesComponent } from './movies/movies.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth.guard';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { TvComponent } from './tv/tv.component';
import { CastDetailsComponent } from './cast-details/cast-details.component';

const routes: Routes = [
  {path:'' , redirectTo:'home',pathMatch:'full'},
  {path:'home' ,component:HomeComponent},
  {path:'movies', canActivate:[AuthGuard] ,component:MoviesComponent},
  {path:'tv', canActivate:[AuthGuard] ,component:TvComponent},
  {path:'about', canActivate:[AuthGuard] ,component:AboutComponent},
  {path:'contact', canActivate:[AuthGuard] ,component:ContactComponent},
  {path:'moviedetails/:id/:term', canActivate:[AuthGuard] , component:MoviedetailsComponent},
  {path:'moviedetails/:id', canActivate:[AuthGuard] , component:MoviedetailsComponent},
  {path:'castDetails/:id', canActivate:[AuthGuard] , component:CastDetailsComponent},
  {path:'tvdetails/:id', canActivate:[AuthGuard] , component:TvdetailsComponent},
  {path:'settings',loadChildren:() => import ('./settings/settings.module').then((m)=> m.SettingsModule)},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'**',component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
