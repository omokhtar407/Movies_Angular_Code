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
  // animations:[
  //   trigger('myAnimation', [
  //     transition('* => *', [
  //       query(
  //         ':enter',
  //         [style({ opacity: 0 })],
  //         { optional: true }
  //       ),
  //       query(
  //         ':leave',
  //          [style({ opacity: 1 }), animate('0.2s', style({ opacity: 0 }))],
  //         { optional: true }
  //       ),
  //       query(
  //         ':enter',
  //         [style({ opacity: 0 }), animate('0.2s', style({ opacity: 1 }))],
  //         { optional: true }
  //       )
  //     ])
  //   ])
  // ]
  animations: [
    trigger("routeAnimation", [
      transition("*<=>*",[
        style({opacity:0}),
        animate("500ms",style({opacity:1}))
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
}
