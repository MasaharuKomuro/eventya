import {EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { IShContextMenuItem } from 'ng2-right-click-menu';
import { BookingMenuComponent } from '../booking-menu/booking-menu.component';
import { BookingDataService } from '../booking-menu/booking-data.service';
import { ToasterComponent } from '../toaster/toaster.component';
import { HttpService } from '../../common/service/http.service';
import { Converter } from '../form-util/Converter';
import {RegistryService} from '../registry/registry.service';

export class EditareaComponent {

  protected organization_list = [];                   // このインスタンスが持つ編成内容
  private   organization_part = [];                   // このインスタンスが持つ編成枠の情報
  protected booking_list = [];                        // このインスタンスが持つ予約情報のリスト
  protected contextMenuItems: IShContextMenuItem[];   // コンテクストメニューの内容
  protected list_buffer = [];                         // ソートする際に、開始前と開始後の配列を比較し、変更されたかどうかを判断するため
  protected is_saving = false;
  private   $: any;
  private   editting_is_repair: boolean = false;      // 直しあり確認済み処理中

  @Input('channel') channel;                          // このチャネルの情報
  @Input('is_active') is_active: boolean;             // タブが現在選択されているか
  @Output() startLoading = new EventEmitter;          // ローディング表示要請
  @Output() doneLoading  = new EventEmitter;          // ローディング表示終了要請

  constructor(
    public bd_service: BookingDataService,
    public httpService: HttpService,
    public registryService: RegistryService
  ) {
    this.initContextMenu();
    this.booking_list = this.bd_service.bookingList;
    this.$ = require('jquery');
  };

  // @Inputで値を受け取った後の処理
  // 編成内容を取得
  public initialize = function(): any {
    this.list = [];
    // 予約リスト初期化
    if (this.booking_list[this.channel.administration_name]) {
      this.booking_list[this.channel.administration_name].map((item, index) => {
        delete this.booking_list[this.channel.administration_name][index];
      });
    }

    // httpリクエストを実行する。成功し完了後、trueを返す
    return this.httpService.doHttp('parts', {part_id: this.channel.id})
      .subscribe((part) => {
      this.organization_list = Converter.parsePartToEditList(part, this.channel.administration_name, this.booking_list);
      this.organization_part = part;
      console.log('done initialize : ' + this.channel.name);
    });
  };

  // コンテクストメニューを操作するため
  @ViewChild(BookingMenuComponent) bookingMenuComponent: BookingMenuComponent;
  // 予約リストのオープンボタンのイベント処理
  protected onClickBookingMenu(event: any): void {
    this.bookingMenuComponent.open(event);
  };


  protected onSortStart = function(): void {
    console.log('start');
    this.list_buffer = this.organization_list.concat(); // 値渡し
  };

  protected onSortEnd = function(): void {
    if (JSON.stringify(this.list_buffer) === JSON.stringify(this.organization_list)) {
      console.log('end (with not edit)');
      return;
    }
    console.log('end (edited)');
    // タグに編集中のクラスを付与する
    this.markEdited();
  };

  // タグに編集中のクラスを付与する
  private markEdited = function(): void {
    const tab = document.querySelector('.nav-item.active');
    // アクティブなタグの要素にクラスを追加
    tab.firstElementChild.classList.add('editlidt-edited-tab');
    // タブのジャンル名表示部分の要素にクラスを追加
    tab.firstElementChild.firstElementChild.classList.add('editlidt-edited-tab-content');
    this.list_buffer = [];
  };

  // タグに編集中のクラスを削除する
  static unmarkEdited = function(all: boolean = false): void {
    if ( all ) {
      console.log(all);
      const tabs = document.querySelector('.nav.nav-tabs').querySelectorAll('li');
      for ( let i = 0; i < tabs.length; i++ ) {
        tabs[i].firstElementChild.classList.remove('editlidt-edited-tab');
        tabs[i].firstElementChild.firstElementChild.classList.remove('editlidt-edited-tab-content');
      }
    } else {
      const tab = document.querySelector('.nav-item.active');
      // アクティブなタグの要素のクラスを削除
      tab.firstElementChild.classList.remove('editlidt-edited-tab');
      // タブのジャンル名表示部分の要素のクラスを削除
      tab.firstElementChild.firstElementChild.classList.remove('editlidt-edited-tab-content');
      this.list_buffer = [];
    }
  };

  // 右上に情報を表示するためのコンポーネント
  @ViewChild(ToasterComponent) toasterComponent: ToasterComponent;

  // 編成リストに追加する
  public addTo($event: any): void {
    const id_of_added_story = $event.dragData.id;
    const channels = $event.dragData.channels;

    // 同じものは追加できない
    for (const i in this.organization_list) {
      if (this.organization_list[i]['id'] === id_of_added_story) {
        this.toasterComponent.showWarning('追加済みです。');
        return;
      }
    }

    // 予約リストに登録済みの記事も登録しない
    for (const key1 in this.booking_list[this.channel.administration_name]) {
      if (this.booking_list[this.channel.administration_name].hasOwnProperty(key1)) {
        for (const key2 in this.booking_list[this.channel.administration_name][key1]) {
          if (this.booking_list[this.channel.administration_name][key1].hasOwnProperty(key2)) {
            if (this.booking_list[this.channel.administration_name][key1][key2].id === id_of_added_story) {
              this.toasterComponent.showWarning('予約リストに登録済みのため、追加できませんでした。');
              return;
            }
          }
        }
      }
    }

    // 追加先として許可されるのは、トピックスか、自ジャンルのみ
    for (const key in channels) {
      console.log(channels);
      console.log(this.channel);
      if (channels.hasOwnProperty(key)) {
        if (channels[key].administration_name !== this.channel.administration_name &&
          this.channel.administration_name !== 'topics') {
          this.toasterComponent.showWarning('ジャンルが異なるため、追加できません。');
          return;
        }
      }
    }
    // タグに編集中のクラスを付与する
    this.markEdited();
    // ドラッグされたデータを編成リストに追加
    this.organization_list.push($event.dragData);
  };

  // 保存ボタンを押した時の処理
  protected save(): void {
    console.log('保存します');
    console.log('編成内容');
    console.log(this.organization_list);
    console.log('予約リスト');
    console.log(this.booking_list[this.channel.administration_name]);

    // ロード画面を表示
    this.is_saving = true;

    // 編成内容をJSONオブジェクトに整形する
    const content = [];
    let counter = 1;
    // 記事をセット
    this.organization_list.map((story) => {
      const item = {};
      item['part_value_id'] = this.organization_part['pv_id'];
      item['rank'] = counter;
      item['subrank'] = 1;
      item['link'] = this.channel.path;
      item['resource_type'] = 'Story';
      item['resource_id'] = story.id;
      item['notes'] = '';
      content.push(item);
      counter++;
    });
    // 予約記事をセット
    if (this.booking_list[this.channel.administration_name]) {
      this.booking_list[this.channel.administration_name].map((stories, index) => {
        counter = 2;
        stories.map((story) => {
          const item = {};
          item['part_value_id'] = this.organization_part['pv_id'];
          item['rank'] = index;
          item['subrank'] = counter;
          item['link'] = this.channel.path;
          item['resource_type'] = 'Story';
          item['resource_id'] = story.id;
          item['notes'] = '';
          content.push(item);
          counter++;
        });
      });
    }
    const body = {
      part_id: this.organization_part['part_id'],
      content: content,
      status: this.organization_part['status'],
      disclosed_at: this.organization_part['disclosed_at'],
      updated_at: this.organization_part['updated_at'],
      random: this.organization_part['random']
    };
    console.log('保存する内容');
    console.log(body);
    this.httpService.doHttp('parts', {body: JSON.stringify(body)}, 'Post')
      .subscribe(
        (result) => {
          console.log(result);
          EditareaComponent.unmarkEdited();

          counter = 1;
          this.organization_list.forEach((story) => {
            // 順位グループの情報（トピ・殿堂・タブ）を振り直す
            Converter.refreshPositionAttr(story, counter, this.channel.administration_name);
            counter++;
          });
          console.log(this.organization_list);
          this.toasterComponent.showSuccess('保存が完了しました。');
          this.is_saving = false;
          this.initialize();
        },
        (error) => {
          this.toasterComponent.showWarning('保存に失敗しました。');
          this.is_saving = false;
          this.initialize();
        }
      );
  }

  // １つ上に予約する
  protected bookingUpper = (story_obj): void => {
    const result = this.bd_service.bookingUpper(story_obj);
    if (result) {
      this.removeStoryFromList(story_obj);
    } else {
      this.toasterComponent.showWarning('予約できませんでした。');
    }
  };

  // １つ下に予約する
  protected bookingLower = (story_obj): void => {
    const result = this.bd_service.bookingLower(story_obj);
    if (result) {
      this.removeStoryFromList(story_obj);
    } else {
      this.toasterComponent.showWarning('予約できませんでした。');
    }
  };

  // 記事を編成リストから削除する
  protected removeStoryFromList(story_obj): void {
    const data = story_obj.dataContext;
    const story = data.story;
    for (const i in this.organization_list) {
      if (this.organization_list[i] ===  story) {
        this.organization_list.splice(parseInt(i, 10), 1);
        console.log('remove');
        console.log('index ; ' + i);
        console.log(this.organization_list);
      }
    }
  };

  // 予約リストを返す
  protected getBookingStoriesToShow(channel: string, index: number) {
    return this.bd_service.getBookingStoriesToShow(channel, index);
  };

  // 予約リスト確認ボタンを行に表示するか否かを返す
  protected showBookingListButton = (channel: string, index: number): boolean => {
    return this.bd_service.showBookingListButton(channel, index);
  };

  // 直しあり確認済みをクリックした時の操作
  protected confirmRepairFlag = (event) => {
    if (this.editting_is_repair) {
      return false;
    }
    this.editting_is_repair = true;
    // 親コンポーネントにローディング表示開始を要請
    this.startLoading.emit();
    const story = event.dataContext.story;
    if (!story.alerts.is_repair) {
      return false;
    } else {
      const alert = story.alerts.is_repair;
      this.httpService.doHttp(
        'post_alerts', {status: this.registryService.status.DELETE, updated_at: alert.updated_at}, 'Post', 'default', alert.id
      ).subscribe((result) => {
        // 直しあり表示を消去
        story.alerts.is_repair.status = this.registryService.status.DELETE;
        this.toasterComponent.showSuccess(result);
        this.editting_is_repair = false;
        // 親コンポーネントにローディング表示終了を要請
        this.doneLoading.emit();
      }, (error) => {
        if (error.status === 409) {
          this.toasterComponent.showWarning('他のユーザが編集済みです。画面を更新して最新にしてください。');
        } else {
          this.toasterComponent.showWarning('不明なエラーが発生しました。');
        }
        this.editting_is_repair = false;
        // 親コンポーネントにローディング表示終了を要請
        this.doneLoading.emit();
      });
    }
  };

  // コンテクストメニューの内容を初期化する
  protected initContextMenu() {
    this.contextMenuItems =
      [
        {
          label: '１つ上に予約',
          onClick: this.bookingUpper
        },
        {
          label: '１つ下に予約',
          onClick: this.bookingLower
        },
        {
          label: '直しあり確認済み',
          onClick: this.confirmRepairFlag,
          disabled: data => {
            const story = data.story;
            if (story.hasOwnProperty('alerts')) {
              if (story.alerts.hasOwnProperty('is_repair')) {
                return parseInt(story.alerts.is_repair.status, 10) === this.registryService.status.DELETE;
              }
            }
            return true;
          }
        },
      ];
  };

  // 編成リストのヘッダーの内容を返す
  protected static setHeaders() {
    return [
      {
        name : '順位',
        label : 'index'
      },
      {
        name : '',
        label : 'flag'
      },
      {
        name : 'ジャンル',
        label : 'channel'
      },
      {
        name : '画像',
        label : 'thumbnail'
      },
      {
        name : '記事 / 公開日時 CP',
        label : 'story'
      },
      {
        name : 'トピ/殿堂/タブ',
        label : 'times'
      },
      {
        name : '状態',
        label : 'status'
      },
      {
        name : '予約',
        label : 'booking'
      }
    ]
  }

}
