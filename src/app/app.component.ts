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
  // title = 'Movies';
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
}
