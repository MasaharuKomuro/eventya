import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  ngOnInit() {
  }

  public myInterval: number = 1500;
  public slides: any[] = [];
  public activeSlideIndex: number = 0;
  public noWrapSlides: boolean = false;
  

}
