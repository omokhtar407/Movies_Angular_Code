import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  error:string='';
  constructor() { }

  submitForm:FormGroup = new FormGroup({
      email:new FormControl(null,[Validators.required ,Validators.email]),
  });

  SubmitForm(submitForm:FormGroup){
    if(submitForm.valid){
      localStorage.setItem('userSubmit', submitForm.value.email);
    }
  }
  ngOnInit(): void {
  }
}
