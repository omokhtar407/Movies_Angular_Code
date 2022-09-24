import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { SliderComponent } from './slider/slider.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgwWowModule } from 'ngx-wow';
import { MoviesComponent } from './movies/movies.component';
import { TvComponent } from './tv/tv.component';
import { SearchPipePipe } from './search-pipe.pipe';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { TvdetailsComponent } from './tvdetails/tvdetails.component';
import { VotePipe } from './vote.pipe';
import { ImagePipe } from './image.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    AboutComponent,
    ContactComponent,
    MoviedetailsComponent,
    SliderComponent,
    MoviesComponent,
    TvComponent,
    SearchPipePipe,
    TvdetailsComponent,
    VotePipe,
    ImagePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgwWowModule,
    ToastrModule.forRoot({preventDuplicates:true,progressBar:true,progressAnimation:'increasing'}),
    CommonModule,
    NgxSpinnerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
