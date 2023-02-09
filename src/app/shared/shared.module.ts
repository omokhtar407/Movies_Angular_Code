import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipePipe } from './pipe/search-pipe.pipe';
import { ImagePipe } from './pipe/image.pipe';
import { VotePipe } from './pipe/vote.pipe';
import { SliderComponent } from './components/slider/slider.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SliderComponent,
    SearchPipePipe,
    VotePipe,
    ImagePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    SliderComponent,
    SearchPipePipe,
    VotePipe,
    ImagePipe,
    FormsModule,
  ],
})
export class SharedModule {}
