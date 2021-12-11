import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error:string='';
  constructor(private _AuthService:AuthService, private _Router:Router,private _NgxSpinnerService:NgxSpinnerService ,private toastr:ToastrService) { }

  loginForm:FormGroup = new FormGroup({

      email:new FormControl(null,[Validators.required ,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
      password:new FormControl(null,[Validators.required ,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)])
  });

  submitLoginForm(loginForm:FormGroup){
    this._AuthService.login(loginForm.value).subscribe((response)=>{

      if(loginForm.valid){

        if(response.message == 'success'){
          localStorage.setItem('userToken',response.token);
          this._AuthService.saveUserData();
          this._Router.navigate(['home']);
          this.toastr.success('Login Successed', "",{positionClass:'toast-top-right',timeOut: 1500});
        }
        else{
          this.error =response.message;
          this.toastr.error(`${this.error}`, "",{positionClass:'toast-top-right',timeOut: 1500});
        }
      }
    });
  }


  ngOnInit(): void {
    this._NgxSpinnerService.show();
    setTimeout(()=>{
      this._NgxSpinnerService.hide();
    },2000);
  }

}
