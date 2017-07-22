import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {MdMenuTrigger} from '@angular/material';
import {BookingDataService} from './booking-data.service';
import {ToasterComponent} from '../toaster/toaster.component';

@Component({
  selector: 'app-booking-menu',
  templateUrl: './booking-menu.component.html',
  styleUrls: ['booking-menu.component.css']
})

// ジャンル、順位をしていしてコンポーネントを生成
// 予約リストを生成する
export class BookingMenuComponent implements OnInit {

  constructor(private bd_service: BookingDataService) {}
  @Input('stories') stories;           // 予約されている記事の一覧
  @Input('channel_name') channel_name; // このコンポーネントが属するチャネルの情報
  @Input('index') index;               // このコンポーネントが置かれる順位

  ngOnInit() {
  }

  // マニュアルで予約リストを開くため
  @ViewChild(MdMenuTrigger) mdMenuTrigger: MdMenuTrigger;
  public open(event) {};

  // 右上にメッセージを出すためのコンポーネント
  @ViewChild(ToasterComponent) toasterComponent: ToasterComponent;

  // 予約解除ボタンを押した時の操作
  public onClickCancel(event, story) {
    console.log('channel : ' + this.channel_name + ' index : ' + this.index);
    const result = this.bd_service.clear(story, this.channel_name, this.index);
    if (result) {
      this.toasterComponent.showSuccess('予約を解除しました。タイトル : ' + story.title);
    } else {
      this.toasterComponent.showWarning('予約を解除出ませんでした。');
    }
  };

  // 表示スタイルを調整する
  private adjustment() {
    const elem = document.getElementsByClassName('cdk-overlay-pane')[0];
    const top = parseInt(document.defaultView.getComputedStyle(elem, '').top.replace('px', ''), 10);
    if ( top <= 0 ) {
      elem.classList.add('booking-menu');
    } else {
      elem.classList.remove('booking-menu');
    }
    console.log(top);
  }

}
