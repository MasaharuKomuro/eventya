import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RegistryService } from "../common/registry.service";

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  ngOnInit() {
  }
  
  public filler_on_carousel: boolean = false;

  constructor (
      public registryService: RegistryService
  ) {
  
  }
  
  public slider_items: Array<any> = [
    {
      img_path: '../../../assets/img/top/slider/bingo.jpg',
      title: '安定・王道の BINGO に一工夫！',
      sp_title: '安定・王道の BINGO に一工夫！',
      description: '来場者一人一人の写真を使った、思い出に残るビンゴゲームです',
      url: 'games/bingo'
    },
    {
      img_path: '../../../assets/img/top/slider/bingo.jpg',
      title: '安定・王道の BINGO に一工夫！',
      sp_title: '安定・王道の BINGO に一工夫！',
      description: '来場者一人一人の写真を使った、思い出に残るビンゴゲームです',
      url: 'games/bingo'
    },
  ];
  

}
