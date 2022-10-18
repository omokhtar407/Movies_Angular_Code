import { Component } from '@angular/core';
import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';
import { RouterOutlet } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger("routeAnimation", [
      transition("*<=>*",[
        style({opacity:0 , transform:"translateX(20px)"}),
        animate("500ms",style({opacity:1, transform:"translateX(0px)"}))
    ])
    ])
  ]
})
export class AppComponent {

  title = 'LoginMoviesProject';

  prepareRoute(outlet: RouterOutlet): any {
    if (outlet.isActivated) {
      return outlet.activatedRoute.snapshot.url
    }

  }

  // Method for Scrolling to Top automatically when i click on routing or any item in pages
  ScrollToTop(event:any) {
    window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
    });
  }

  handelOptBox(){
      let colorBoxWidth = $(".colors-box").innerWidth();

      if($('#optionsBox').css("right") == "0px"){
          $('#optionsBox').animate({right:`-${colorBoxWidth}`}, 500);
      }
      else{
          $('#optionsBox').animate({right:`0px`}, 500);
      }
  }

  changeWebsiteToRed(){
    const body = document.querySelector('body')
    body?.classList.remove('blue');
    body?.classList.remove('orange');
  }
  changeWebsiteToBlue(){
    const body = document.querySelector('body')
    body?.classList.add('blue');
    body?.classList.remove('red');
    body?.classList.remove('orange');
  }
  changeWebsiteToOrange(){
    const body = document.querySelector('body')
    body?.classList.add('orange');
    body?.classList.remove('red');
    body?.classList.remove('blue');
  }

}
