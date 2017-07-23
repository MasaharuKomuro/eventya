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
  private number_colors_master = [
    {
      body:   '#e9749a',
      border: '#df58ab'
    },
    {
      body:   '#7dc1e4',
      border: '#4080b3'
    },
    {
      body:   '#59d668',
      border: '#228524'
    },
    {
      body:   '#cfcb4d',
      border: '#858522'
    },
    {
      body:   '#cf4d4d',
      border: '#852222'
    }
  ];
  public number_colors = [];
  private total_colors = 5;

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
        // 各数字の色も決定
        this.number_colors.push(
            this.number_colors_master[Math.floor(Math.random() * this.total_colors)]
        );
      }
      if (this.items.length === (this.per_phase - 1)) { filled = true; }
    }
    this.items.push(this.target);
    this.number_colors.push(
        this.number_colors_master[Math.floor(Math.random() * this.total_colors)]
    );
    console.log('items');
    console.log(this.items);
    console.log('number_colors');
    console.log(this.number_colors);

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
      // サイズを調整
      const bingo_card_items = this.$('.bingo-card-img');
      for (let i = 0;  i < bingo_card_items.length; i++) {
        if (bingo_card_items.hasOwnProperty(i)) {
          const width = this.$(bingo_card_items[i]).children('img').width();
          this.$(bingo_card_items[i]).css('margin-left', width / -2 + 'px')
        }
      }
    }, 100);
    this.in_transaction = true;
  }

  public clickConfirm = function() {
    // console.log('OK');
    this.items = [];
    this.number_colors = [];
    // console.log('items');
    // console.log(this.items);
    this.is_animation_end = false;
  };

  public clickBeginning = function () {
    if (window.confirm('本当に初めからプレイしますか？')) {
      localStorage.removeItem(this.storage);
      this.extracted = 0;
      this.leaves = [];
      this.alreadies = [];
      this.clickConfirm();
    }
  };

  public animationEnd = function (e) {
    if (e.animationName !== 'animation-target-image-start') {
      return false;
    }
    if (this.alreadies.length === this.total -1) {
      console.log('終了');
    }
    this.in_transaction = false;
    this.is_animation_end = true;
    this.$('.target-image').addClass('showing-result-number');
  }

}
