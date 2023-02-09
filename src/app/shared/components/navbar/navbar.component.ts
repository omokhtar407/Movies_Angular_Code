import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  isToggle: boolean = false;
  userData:any;

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

  changeWebsiteToRed() {
    const body = document.querySelector('body');
    body?.classList.remove('blue');
    body?.classList.remove('orange');
  }
  changeWebsiteToBlue() {
    const body = document.querySelector('body');
    body?.classList.add('blue');
    body?.classList.remove('red');
    body?.classList.remove('orange');
  }
  changeWebsiteToOrange() {
    const body = document.querySelector('body');
    body?.classList.add('orange');
    body?.classList.remove('red');
    body?.classList.remove('blue');
  }

  ngOnInit(): void {
    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() != null) {
        this.userData = this._AuthService.userData.getValue();
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }
}
