import { Component, OnInit } from '@angular/core';
import {hasOwnProperty} from "tslint/lib/utils";



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {

  private $: any;
  public total: number = 75;
  public per_phase: number = 10;
  public target: number;
  public items = [];
  public alreadies = [];

  constructor() {
    this.$ = require('jquery');
  }

  ngOnInit () {
    this.init();
  }

  public init = function() {
    let valid_number: boolean = false;

    // ターゲットを決定！
    while (!valid_number) {
      this.target = Math.floor(Math.random() * 75 + 1);
      valid_number = true;
      if (this.items.indexOf(this.target) > -1) {
        valid_number = false;
      }
    }
    this.alreadies.push(this.target);
    console.log(this.target);

    // ダミーの写真を決定
    let filled: boolean = false;
    let new_item;
    while (!filled) {
      new_item = Math.floor(Math.random() * 75 + 1);
      if (!(this.items.indexOf(new_item) > -1)) {
        this.items.push(new_item);
      }
      if (this.items.length === (this.per_phase - 1)) { filled = true; }
    }
    this.items.push(this.target);
    console.log(this.items);
    this.items = [1, 2, 3];
    // 追加する画像要素を生成・追加

  };

  public clickStart() {
    this.$('.bingo_card_img').addClass('bingo_card_img_start');
  }

}
