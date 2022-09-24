import { NgwWowService } from 'ngx-wow';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  constructor(private wowService: NgwWowService) {
    this.wowService.init();
  }

  countactForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    subject: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    message: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(200),
    ]),
  });

  CountactForm(countactForm: FormGroup) {
    let usercontact: object = {
      Name: this.countactForm.value.name,
      Email: this.countactForm.value.email,
      Subject: this.countactForm.value.subject,
      Message: this.countactForm.value.message,
    };
    if (countactForm.valid) {
      localStorage.setItem('userContact', JSON.stringify(usercontact));
    }
  }

  ngOnInit(): void {}
}
