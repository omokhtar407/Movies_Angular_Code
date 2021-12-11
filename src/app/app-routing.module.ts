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
import { PeopleComponent } from './people/people.component';

const routes: Routes = [
  {path:'' , redirectTo:'home',pathMatch:'full'},
  {path:'home', canActivate:[AuthGuard] ,component:HomeComponent},
  {path:'movies', canActivate:[AuthGuard] ,component:MoviesComponent},
  {path:'tv', canActivate:[AuthGuard] ,component:TvComponent},
  {path:'people', canActivate:[AuthGuard] ,component:PeopleComponent},
  {path:'about', canActivate:[AuthGuard] ,component:AboutComponent},
  {path:'contact', canActivate:[AuthGuard] ,component:ContactComponent},
  {path:'moviedetails/:id/:term', canActivate:[AuthGuard] , component:MoviedetailsComponent},
  {path:'moviedetails/:id', canActivate:[AuthGuard] , component:MoviedetailsComponent},
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
