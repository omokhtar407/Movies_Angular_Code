import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error:string='';
  constructor(private _AuthService:AuthService, private _Router:Router) { }

  loginForm:FormGroup = new FormGroup({

      email:new FormControl(null,[Validators.required ,Validators.email]),
      password:new FormControl(null,[Validators.required ,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)])
  });

  submitLoginForm(loginForm:FormGroup){
    this._AuthService.login(loginForm.value).subscribe((response)=>{

      if(loginForm.valid){

        if(response.message == 'success'){
          localStorage.setItem('userToken',response.token);
          this._AuthService.saveUserData();
          this._Router.navigate(['home']);
        }
        else{
          this.error =response.errors.email.message;
        }
      }
    });
  }


  ngOnInit(): void {
    $('.lds-ellipsis').fadeOut(2000 ,() => {
      $('.lds-ellipsis').parent().fadeOut(3000 , ( ) => {
          $('.loading').remove();
          $('body').css("overflow","auto");
      });
  });
  }

}
