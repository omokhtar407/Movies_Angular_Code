
import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor(private wowService: NgwWowService) {this.wowService.init(); }

  pureCounter(){

    let numbs = document.querySelectorAll('.span_num');
    let sectionAbout:any = document.querySelector('#about') ;
    let started  = false; // Function Started ? No

    window.addEventListener('scroll',function(){
      if(window.scrollY >= sectionAbout.offsetTop - 150){
          if(!started){
            numbs.forEach((num)=> startCount(num) );
          }
          started = true;
      }

    })

    function startCount(el:any){
        let goal = el.dataset.goal;
        let countX = setInterval(function(){
            el.textContent++;
            if(el.textContent == goal){
                clearInterval(countX);
            }
        },3000 / goal);
    }
  }

  ngOnInit(): void {
    this.pureCounter();
  }

}
