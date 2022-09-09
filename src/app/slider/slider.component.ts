import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() headerTrendingMovies:any[]=[];
  imgPrefix:string='https://image.tmdb.org/t/p/w500/';
  constructor() { }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    nav:false,
    margin:10,
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 5
      },
      940: {
        items:7
      }
    },
  }

  MakeShadowOnContainer():void{
    let SliderContent:any = document.querySelector('.slider_content');

    window.addEventListener('scroll',()=>{

        SliderContent.style.opacity = 1 - +window.pageYOffset/550+'';
        SliderContent.style.top = +window.pageYOffset+'px';
        SliderContent.style.backgroundPositionY = -  +window.pageYOffset/2+'px';

    });
  }
  
  ngOnInit(): void {
    this.MakeShadowOnContainer();
  }

}
