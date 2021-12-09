import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error:string='';
  constructor(private _AuthService:AuthService, private _Router:Router ,private toastr:ToastrService) { }

  registerForm:FormGroup = new FormGroup({

      first_name:new FormControl(null,[Validators.required ,Validators.minLength(3),Validators.maxLength(8)]),
      last_name:new FormControl(null,[Validators.required ,Validators.minLength(3),Validators.maxLength(8)]),
      email:new FormControl(null,[Validators.required ,Validators.email]),
      password:new FormControl(null,[Validators.required ,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)]),
      age:new FormControl(null,[Validators.required ,Validators.min(16),Validators.max(80)])
  });

  submitRegisterForm(registerForm:FormGroup){
    this._AuthService.register(registerForm.value).subscribe((response)=>{

      if(registerForm.valid){

        if(response.message == 'success'){

          this.toastr.success('Success', "",{positionClass:'toast-top-right',timeOut: 1500});
        }
        else{
          this.error = response.errors.email.message;
          this.toastr.error(`${this.error}!`, "",{positionClass:'toast-top-right',timeOut: 1500});
        }
      }
    });
  }


  ngOnInit(): void {
  } 

}
