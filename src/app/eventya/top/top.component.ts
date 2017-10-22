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
  
  public article_items: Array<any> = [
    {
      title: 'パーティーゲームの<strong>決定版</strong>',
      body: '「いべんとや」は結婚式・二次会・パーティ・クラブイベントなどの時に大活躍するパーティーゲームを製作しています。' +
          'ここぞと言う時、ついついみんなで盛り上がってしまうようなゲームを、高機能で操作の簡単なwebアプリで体感して見ませんか？'
    },
    {
      title: '<strong>決定版</strong>',
      body: '「いべんとや」は結婚式・二次会・パーティ・クラブイベントなどの時に大活躍するパーティーゲームを製作しています。' +
      'ここぞと言う時、ついついみんなで盛り上がってしまうようなゲームを、高機能で操作の簡単なwebアプリで体感して見ませんか？'
    },
    {
      title: 'パーティーゲームの<strong>決定版</strong>',
      body: '「いべんとや」は結婚式・二次会・パーティ・クラブイベントなどの時に大活躍するパーティーゲームを製作しています。' +
      'ここぞと言う時、ついついみんなで盛り上がってしまうようなゲームを、高機能で操作の簡単なwebアプリで体感して見ませんか？'
    }
  ];
  
}
