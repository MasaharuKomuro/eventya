import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {

  private $: any;
  public total: number = 75;
  public extracted: number = 0;
  public leaves = [];
  public per_phase: number = 6;
  public target: number;
  public items = [];
  public alreadies = [];
  public in_transaction: boolean = false;
  public is_animation_end: boolean = false;

  constructor() {
    this.$ = require('jquery');
  }

  ngOnInit () {
    for (let i = 0; i < this.total; i++) {
      this.leaves.push(i);
    }
    this.init();
  }

  public init = function() {
    let valid_number: boolean = false;

    // ターゲットを決定！
    while (!valid_number) {
      this.target = Math.floor(Math.random() * this.total + 1);
      valid_number = !(this.items.indexOf(this.target) > -1);
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
  };

  public clickStart() {
    this.$('.bingo-card-img').addClass('bingo-card-img-start');
    this.$('.target-image').addClass('target-image-start');
    this.in_transaction = true;
  }

  public clickConfirm = function() {
    console.log('OK');
    this.items = [];
    this.init();
    this.is_animation_end = false;
  };

  public animationEnd = function (e) {
    console.log('animationEnd');
    console.log(e.animationName);
    if (e.animationName !== 'animation-target-image-start') {
      return false;
    }
    this.in_transaction = false;
    this.is_animation_end = true;
  }

}
