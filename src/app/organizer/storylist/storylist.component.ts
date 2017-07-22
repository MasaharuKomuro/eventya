import { Component, ViewChild} from '@angular/core';
import { HttpService } from '../../common/service/http.service';
import { OnInit } from '@angular/core';
import { IShContextMenuItem } from 'ng2-right-click-menu';
import 'rxjs/add/operator/toPromise';
import { SearchConditionService } from '../search-conditions/search-condition.service';
import { TagConditionService } from 'app/organizer/conditions/tag-condition.service';
import { ChannelConditionService } from '../conditions/channel-condition.service';
import { RegistryService } from '../registry/registry.service';
import { ToasterComponent } from '../toaster/toaster.component';

@Component({
  selector: 'app-story-list',
  templateUrl: 'storylist.component.html',
  styleUrls: ['storylist.component.css']
})

export class StorylistComponent implements OnInit {

  private bottom_margin;
  private searchCondition;
  private $: any;

  // 無限スクロール用
  record = [];
  containerEl;       // 記事リスト表示エリアの要素
  searchConditionEl; // 検索条件表示エリアの要素
  visible_zone = []; // 画面に表示するエリア
  startRow;
  endRow;
  endRecord;

  BLOCK_SIZE          = 20; // 個数
  INNER_HEADER_HEIGHT = 45; // 内側のヘッダーの高さ px
  ROW_HEIGHT;               // 一行の高さ px
  BLOCK_HEIGHT;             // １ブロックの高さ px
  HEADER_HEIGHT       = 60; // ヘッダーの高さ px
  FOOTER_HEIGHT       = 49; // フッターの高さ px

  isEnd           = false;  // 終端フラグ
  isInitLoadDone  = false;  // 初回読み込み終了
  nowLoading      = false;  // ロード中
  isManualScroll  = false;  // ユーザーの操作でスクロールイベントが発生したか
  is_searching    = false;  // 検索中表示をするか
  public editting_is_repair: boolean = false; // 直しあり確認済み処理中

  // 右上に情報を表示するためのコンポーネント
  @ViewChild(ToasterComponent) toasterComponent: ToasterComponent;

  constructor(
    private httpService: HttpService,
    private searchConditionService: SearchConditionService,
    private channelConditionService: ChannelConditionService,
    private tagConditionService: TagConditionService,
    public registryService: RegistryService
  ) {
    this.searchCondition = SearchConditionService.searchCondition;
    this.$ = require('jquery');
  }

  // クリップボードにコピーする
  static saveToClipBoard = function (story: any, type: string): void {
    console.log(story);
    const temp = document.createElement('textarea');

    switch (type) {
      case 'id':
        temp.value = story.id;
        break;
      case 'url':
        temp.value = story.channels[0].path + story.id;
        break;
      default:
        return;
    }
    temp.selectionStart = 0;
    temp.selectionEnd   = temp.value.length;

    const style   = temp.style;
    style.position = 'fixed';
    style.left = '-100%';

    document.body.appendChild(temp);
    temp.focus();
    const result = document.execCommand('copy');
    temp.blur();
    document.body.removeChild(temp);
    // true なら実行できている falseなら失敗か対応していないか
    console.log('クリップ: ' + result);
    console.log(temp.value);
  };

  ngOnInit() {
    // チャネル、タグのマスターが読み込まれるのを待つ
    this.initScrollData();
  }

  onClickRefresh = function() {
    this.initScrollData();
  };

  public runSearch = function() {
    console.log('click search');
    console.log(this.searchCondition);
    this.initScrollData();
  };

  // データの初期化（無限スクロール部分）
  private initScrollData = function() {

    // ローディング表示開始
    this.is_searching = true;

    // チャネル、タグのマスターが読み込まれるのを待つ（初回起動時を想定）
    const wait_for_master_loading = setInterval(() => {
      console.log('waiting master loading ...');
      if (Object.keys(this.channelConditionService.treeViewItem).length !== 0 &&
          Object.keys(this.tagConditionService.treeViewItem).length     !== 0) {
        console.log('マスター取得完了');
        console.log(this.channelConditionService.treeViewItem);
        console.log(this.tagConditionService.treeViewItem);

        // マスター取得完了、処理開始
        // 各種パラメータを初期化
        this.containerEl = null;
        this.searchConditionEl = null;

        // 左の検索画面の高さを、表示されている高さに固定する
        this.containerEl = document.getElementById('storylist-container');
        this.containerEl.style.height = window.innerHeight
          - this.HEADER_HEIGHT - this.FOOTER_HEIGHT - this.INNER_HEADER_HEIGHT + 'px';

        this.searchConditionEl = document.getElementById('search-modal-container');

        this.ROW_HEIGHT = 46;
        this.BLOCK_HEIGHT = this.ROW_HEIGHT * this.BLOCK_SIZE;

        // 初期表示データを取得
        this.getRecord(0, this.BLOCK_SIZE * 3)
          .then( (result: any) => {
            console.log(result);
            this.record = result;
            this.endRecord = this.BLOCK_SIZE * 3;
            this.startRow = 0;
            this.endRow = this.BLOCK_SIZE * 2;                                 // 表示末尾データの行番号
            this.visible_zone = this.record.slice(this.startRow, this.endRow); // 40
            this.isInitLoadDone = true;                                        // 初期処理完了フラグ
            console.log(this.startRow + 'to' + this.endRow);
            console.log(result);

            // ローディング表示終了
            this.is_searching = false;
          });
        clearInterval(wait_for_master_loading);
      }
    }, 400);
  };

  // --------------------------
  // スクロールイベント処理
  // --------------------------
  public onScrollStorylist = function(event) {
    // 初期処理完了前のスクロールイベントは無視
    if (!this.isInitLoadDone) { return }
    if (this.isManualScroll) {
      this.isManualScroll = false;
      return;
    }

    // 画面のレイアウト情報取得
    const html = this.containerEl;                                // 記事検索画面のhtml要素
    const elemHeight = html.scrollHeight;                         // 全体の高さ
    const clientHeight = html.clientHeight;                       // 表示域の高さ
    const scrollPos = html.scrollTop;                             // スクロール位置
    this.bottom_margin = elemHeight - clientHeight - scrollPos; // 下方向スクロール可能サイズ
    console.log(this.searchConditionEl);
    const top_margin = scrollPos - this.searchConditionEl.offsetHeight - this.ROW_HEIGHT;

    // ロード中はヘッダーより上にスクロールできない
    if ( this.nowLoading && top_margin < 0 ) {
      this.containerEl.scrollTop = this.searchConditionEl.offsetHeight + this.ROW_HEIGHT;
    }

    // バッファ追加の判定(下方向)
    if (this.bottom_margin === 0 && !this.isEnd && !this.nowLoading && !this.isManualScroll) {
      // ロード中フラグを立てる
      this.nowLoading = true;
      this.onScrollDown();
      return;
    }

    // バッファ追加の判定(上方向)
    if (top_margin < 0 && !this.nowLoading && this.startRow !== 0 && !this.isManualScroll) {
      // ロード中フラグを立てる
      this.nowLoading = true;
      this.onScrollUp();
      return;
    }
  };

  // バッファ追加(下方向)
  private onScrollDown = function() {

    console.log('Scroll Down');

    // 表示位置カウンタの更新
    this.startRow += this.BLOCK_SIZE;
    this.endRow += this.BLOCK_SIZE;

    this.visible_zone = this.record.slice(this.startRow, this.endRow);
    this.containerEl.scrollTop = this.containerEl.scrollHeight - this.containerEl.clientHeight
      - document.getElementById('card_block').offsetHeight;

    if ( this.endRecord === this.endRow ) {
      this.endRecord += this.BLOCK_SIZE;
    } else {
      console.log(this.startRow + ' to ' + this.endRow);
      this.nowLoading = false;
      return;
    }

    setTimeout( () => {
      this.getNextBuffer();
    }, 1);
  };

  // 次に追加するバッファ作成(下方向)
  private getNextBuffer = function() {
    this.getRecord(this.startRow + this.BLOCK_SIZE * 2, this.BLOCK_SIZE)
      .then((result: any) => {
      console.log('then');

        // ロード中フラグを元に戻す
        this.nowLoading = false;
        const rec = result;

        if (rec.length === this.BLOCK_SIZE) {      // ブロックサイズ分の追加データあり
          this.isEnd = false;
          this.record = this.record.concat(rec);
        } else if (rec.length === 0) {             // 追加データなし
          this.isEnd = true;
        } else {                                   // 末尾データでブロックサイズ分のデータなし
          this.isEnd = true;
          this.record = this.record.concat(rec);
          this.visible_zone = this.visible_zone.concat(rec);
        }

        // 位置を調整する
        if (this.bottom_margin === 0) {
          console.log('scroll back');
          // 下スクロールイベントが発生するように1pxスクロールを戻す
          this.containerEl.scrollTop = this.containerEl.scrollHeight - this.containerEl.clientHeight - 1;
        }
        console.log(this.startRow + ' to ' + this.endRow);
        console.log(result);
      })
  };

  // バッファ追加（上方向）
  private onScrollUp = function(): void{
    console.log('scroll Up');

    // 表示位置カウンタの更新
    this.startRow -= this.BLOCK_SIZE;
    this.endRow -= this.BLOCK_SIZE;

    this.visible_zone = this.record.slice(this.startRow, this.endRow);

    console.log(this.startRow + ' to ' + this.endRow);
    this.containerEl.scrollTop = this.searchConditionEl.offsetHeight + this.ROW_HEIGHT + this.BLOCK_HEIGHT + 1;

    this.isManualScroll = true;
    this.nowLoading = false;
    this.isEnd = false;
  };

  // サーバーからデータ取得
  private getRecord = function(begin: number, size: number): Promise<any> {
    console.log(this.searchCondition);
    console.log(SearchConditionService.searchCondition);
    console.log(this.record);
    // HTTPリクエスト条件設定
    const config = this.searchConditionService.buildSearchConditionObject();
    config['limit']  = size;
    config['offset'] = begin;
    // HTTPリクエスト開始
    const observable = this.httpService.doHttp('story', {conditions: JSON.stringify(config)});

    return observable.toPromise(Promise); /* ObservableをPromiseに変換して返す */
  };

  // 記事編集
  private editStory = function ($event: any): void {};

  // 記事参照
  private readStory = function ($event: any): void {};

  // プレビュー開始
  private preview = function ($event: any): void {};

  // URLをクリップボードにコピーする
  private clipURL = function ($event: any): void {
    console.log($event);
    StorylistComponent.saveToClipBoard($event.dataContext, 'url');
  };

  // 記事IDをクリップボードのコピーする
  private clipStoryId = function ($event: any): void {
    console.log($event);
    StorylistComponent.saveToClipBoard($event.dataContext, 'id');
  };

  // 記事をコピーして新規作成する
  private copyStory = function ($event: any): void {};

  // 記事を没にする
  private disableStory = function ($event: any): void {};

  // 直しあり確認済みをクリックした時の操作
  protected confirmRepairFlag = (event) => {
    console.log(event);
    if (this.editting_is_repair) {
      return false;
    }
    this.editting_is_repair = true;
    const story = event.dataContext;
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
      }, (error) => {
        if (error.status === 409) {
          this.toasterComponent.showWarning('他のユーザが編集済みです。画面を更新して最新にしてください。');
        } else {
          this.toasterComponent.showWarning('不明なエラーが発生しました。');
        }
        this.editting_is_repair = false;
      });
    }
  };

  public items: IShContextMenuItem[] =
    [
      {
        label: '記事編集',
        onClick: this.editStory
      },
      {
        label: '記事参照',
        onClick: this.readStory
      },
      {
        label: '直しあり確認済み',
        onClick: this.confirmRepairFlag,
        disabled: story => {
          if (story.hasOwnProperty('alerts')) {
            if (story.alerts.hasOwnProperty('is_repair')) {
              return parseInt(story.alerts.is_repair.status, 10) === this.registryService.status.DELETE;
            }
          }
          return true;
        }
      },
      {
        label: 'プレビュー',
        onClick: this.preview,
      },
      {
        label: 'URLクリップ',
        onClick: this.clipURL
      },
      {
        label: '記事IDクリップ',
        onClick: this.clipStoryId
      },
      {
        label: '記事コピー',
        onClick: this.copyStory
      },
      {
        label: '記事没',
        onClick: this.disableStory
      }
    ];
}
