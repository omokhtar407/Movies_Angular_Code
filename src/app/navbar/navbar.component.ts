import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  isLogin: boolean = false;
  isToggle: boolean = false;

  constructor(private _AuthService: AuthService) {}

  logOut() {
    this._AuthService.logout();
  }
  addCollapse() {
    $('button').next('.collapse').slideToggle(300);
    this.isToggle = true;
  }

  removeCollapse() {
    $('.collapse').fadeOut(300);
    this.isToggle = false;
  }

  ngOnInit(): void {
    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() != null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }
}
