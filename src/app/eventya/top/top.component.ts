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
      title: 'パーティーゲームなら<strong>いべんとや</strong>',
      body: '<strong>結婚式・二次会・パーティ・クラブイベント</strong>などの時に大活躍するパーティーゲームを製作しています。' +
          'ここぞと言う時、ついついみんなで盛り上がってしまうようなゲームを、高機能で操作も簡単なwebアプリで体感して見ませんか？'
    },
    {
      title: '　<strong>[簡単 × 楽しい]</strong>WEBアプリでパーティーゲーム',
      body: ' イベントを開催する時、例えば定番のビンゴゲーム大会を企画して参加者全員で楽しい時間を作ろうと考えることがあります。' +
          'でも、タダでさえ忙しいイベント企画の中、ゲーム用の道具を購入して、現場に搬入して、ビンゴカードを配って、足りない時は買い足して、、、なんて色々と大変ですよね。' +
          'また、「タダのビンゴゲームじゃあありきたり」だけど、一工夫をを考えるのもこれまた大変。<br>' +
          '<strong>いべんとや</strong>のアプリは全てwebアプリになってますので、簡単に普段とは一味違う定番のパーティーゲームで盛り上げる事ができます。'
    },
    {
      title: 'いべんとやのアプリの<strong>特徴</strong>',
      body: ' たとえば、あなたがイベントで「全員参加のゲームで盛り上がろう！」と思った時に、参加者全員にiPhoneやAndroidのアプリをインストールしてもらうのは大変ですよね。' +
      '「いべんとや」のゲームは全て<strong>WEBアプリ</strong>になっています。なので、chromeやsafariなどのブラウザからURLにアクセスするだけで簡単に使用できます。(ここは絵を入れよう)' +
      'また、「ブラウザのゲームってボタンを押すたびにページが更新されて、待ち時間が、、」なんで思った事はありませんか。そこで、いべんとやのアプリはすべてAngularという' +
      '最新鋭の言語を使用して、SPAサイトで開発しています。なので、ページの更新が発生するのはあなたが最初にブラウザにアクセスした一回目だけです。'
    },
    {
      title: 'パーティーゲームの<strong>決定版</strong>',
      body: '「いべんとや」は結婚式・二次会・パーティ・クラブイベントなどの時に大活躍するパーティーゲームを製作しています。' +
      'ここぞと言う時、ついついみんなで盛り上がってしまうようなゲームを、高機能で操作の簡単なwebアプリで体感して見ませんか？'
    }
  ];
  
}
