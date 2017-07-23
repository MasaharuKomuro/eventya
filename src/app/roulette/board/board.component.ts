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
  public storage = 'bingo_data_20170827';

  constructor() {
    this.$ = require('jquery');
  }

  ngOnInit () {
    for (let i = 1; i <= this.total; i++) {
      this.leaves.push(i);
    }

    // ローカルストレージから状態を取得
    const status = JSON.parse(localStorage.getItem(this.storage));
    if (status) {
      console.log('from local storage');
      console.log(status);
      this.extracted = status.extracted;
      this.leaves    = status.leaves;
      this.alreadies = status.alreadies;
    }
  }

  public init = function() {
    // ターゲットを決定！
    const target_num = Math.floor(Math.random() * (this.total + 1 - this.extracted));
    console.log('target_num');
    console.log(target_num);
    // console.log('leaves');
    // console.log(this.leaves);
    this.target = this.leaves[target_num];
    console.log('target');
    console.log(this.target);
    this.leaves.splice(target_num, 1);
    console.log('leaves');
    console.log(this.leaves);
    this.alreadies.push(this.target);
    console.log('alreadies');
    console.log(this.alreadies);
    this.extracted++;
    console.log('extracted');
    console.log(this.extracted);

    // ダミーの写真を決定
    let filled: boolean = false;
    let new_item;
    while (!filled) {
      new_item = Math.floor(Math.random() * 75 + 1);
      if (!(this.items.indexOf(new_item) > -1) && new_item !== this.target) {
        this.items.push(new_item);
      }
      if (this.items.length === (this.per_phase - 1)) { filled = true; }
    }
    this.items.push(this.target);
    console.log('items');
    console.log(this.items);

    // 状態をローカルストレージに保存
    localStorage.setItem(this.storage, JSON.stringify({
      'extracted' : this.extracted,
      'leaves'    : this.leaves,
      'alreadies' : this.alreadies
    }));
  };

  public clickStart() {
    this.init();
    setTimeout(() => {
      this.$('.bingo-card-img').addClass('bingo-card-img-start');
      this.$('.target-image').addClass('target-image-start');
    }, 100);
    this.in_transaction = true;
  }

  public clickConfirm = function() {
    // console.log('OK');
    this.items = [];
    // console.log('items');
    // console.log(this.items);
    this.is_animation_end = false;
  };

  public clickBeginning = function () {
    if (window.confirm('本当に初めからプレイしますか？')) {
      localStorage.removeItem(this.storage);
      this.clickConfirm();
    }
  };

  public animationEnd = function (e) {
    if (e.animationName !== 'animation-target-image-start') {
      return false;
    }
    this.in_transaction = false;
    this.is_animation_end = true;
  }

}
