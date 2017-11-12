import { Component, OnInit } from '@angular/core';
import { RegistryService } from '../common/registry.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  constructor(
      public registryService: RegistryService
  ) { }

  ngOnInit() {}
  
  public items: Array<object> = [
    {
      title: 'BINGO',
      description: '来場者みんなが楽しめるビンゴゲームです。',
      body: '本文ーー本文ーー本文ーー本文ーー本文ーー本文ーー本文ーー本文ーー' +
      '本文ーー本文ーー本文ーー本文ーー本文ーー本文ーー本文ーー本文ーー',
      image: {
        path: this.registryService.images['bingo']['main'],
        caption: ''
      },
      url: '/top'
    },
    {
      title: 'BINGO',
      description: '来場者みんなが楽しめるビンゴゲームです。',
      body: '本文ーー本文ーー本文ーー本文ーー本文ーー本文ーー本文ーー本文ーー' +
      '本文ーー本文ーー本文ーー本文ーー本文ーー本文ーー本文ーー本文ーー',
      image: {
        path: this.registryService.images['bingo']['main'],
        caption: ''
      },
      url: '/top'
    }
  ];

}
