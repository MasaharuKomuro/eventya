import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RegistryService } from "../common/registry.service";
import objectContaining = jasmine.objectContaining;

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  ngOnInit() {
  }
  
  public in_view_items: object = {};

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
      title: '<strong>プレオープン中！無料で遊んじゃおう！</strong>(2月まで)',
      body: '2017年11月、<strong>「いべんとや」</strong>サイトをプレオープンしました。' +
      'これからどんどんゲームを作って、もっともっと楽しいサイトにして行きますが、先ずは<strong>無料</strong>でみなさまに楽しんで頂きたいと思います。' +
      'リンクからポリシーを読んで、紳士にご使用よろしくお願いいたします。',
      image: {
        path: 'https://image.freepik.com/free-photo/no-translate-detected_1098-1228.jpg',
        caption: '<a href="https://jp.freepik.com/free-photos-vectors/birthday">' +
        'Birthday写真Pressfoto - Freepik.comによるデザイン</a>'
      }
    },
    {
      title: 'パーティーゲームなら<strong>「いべんとや」</strong>',
      body: '<strong>結婚式・二次会・パーティ・クラブイベント</strong>などの時に大活躍するパーティーゲームを製作しています。' +
          'ここぞと言う時、ついついみんなで盛り上がってしまうようなゲームを、高機能で操作も簡単なwebアプリで体感して見ませんか？',
      image: {
        path: '../../../assets/img/top/slider/bingo.jpg'
      }
    },
    {
      title: '<strong>[簡単 × 楽しい]</strong>WEBアプリでパーティーゲーム',
      body: 'イベントを開催する時、例えば定番のビンゴゲーム大会を企画して参加者全員で楽しい時間を作ろうと考えることがあります。' +
          'でも、タダでさえ忙しいイベント企画の中、ゲーム用の道具を購入して、現場に搬入して、ビンゴカードを配って、足りない時は買い足して、、、なんて色々と大変ですよね。' +
          'また、「タダのビンゴゲームじゃあありきたり」だけど、一工夫をを考えるのもこれまた大変。<br>' +
          '<strong>いべんとや</strong>のアプリは全てwebアプリになってますので、簡単に普段とは一味違う定番のパーティーゲームで盛り上げる事ができます。'
    },
    {
      title: '「いべんとや」の<strong>アプリの特徴</strong>',
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
  
  public setInViewStyle = ( index: number, event: any ): void => {
    this.in_view_items[index] = !event.isOutsideView || !!this.in_view_items[index];
    console.log(index);
  };
  
  public getInViewStyle = ( index: number ): boolean => {
    return !!this.in_view_items[index];
  }
}
