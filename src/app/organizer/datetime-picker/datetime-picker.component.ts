import {Component, OnInit, Input} from '@angular/core';
import {SearchConditionService} from "../search-conditions/search-condition.service";
import {Ng2Datetime} from "ng2-datetime-picker";

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.css']
})
export class DatetimePickerComponent implements OnInit {

  @Input() label; // この検索条件の表示情報
  private input;  // 検索条件の入力値

  constructor() {
    this.input = SearchConditionService.searchCondition;

    //DateTimePickerの表示ラベルを日本語にオーバーライドする
    Ng2Datetime.daysOfWeek =
      [
        { fullName: '日', shortName: '日' },
        { fullName: '月', shortName: '月' },
        { fullName: '火', shortName: '火' },
        { fullName: '水', shortName: '水' },
        { fullName: '木', shortName: '木' },
        { fullName: '金', shortName: '金' },
        { fullName: '土', shortName: '土' }
      ];

    Ng2Datetime.months =
      [
        {fullName: '1月',  shortName: '1月'},
        {fullName: '2月',  shortName: '2月'},
        {fullName: '3月',  shortName: '3月'},
        {fullName: '4月',  shortName: '4月'},
        {fullName: '5月',  shortName: '5月'},
        {fullName: '6月',  shortName: '6月'},
        {fullName: '7月',  shortName: '7月'},
        {fullName: '8月',  shortName: '8月'},
        {fullName: '9月',  shortName: '9月'},
        {fullName: '10月', shortName: '10月'},
        {fullName: '11月', shortName: '11月'},
        {fullName: '12月', shortName: '12月'}
      ];

    Ng2Datetime.locale = {
      date:   '日時',
      time:   '時分',
      year:   '年',
      month:  '月',
      day:    '日',
      hour:   '時',
      minute: '分',
      currentTime: "現在時刻"
    };
  }

  ngOnInit() {
  }

}
