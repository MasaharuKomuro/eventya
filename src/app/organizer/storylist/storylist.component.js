"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
var StorylistComponent = (function () {
    function StorylistComponent(httpService) {
        this.httpService = httpService;
        //無限スクロール用
        this.record = [];
        this.visible_zone = []; // 画面に表示するエリア
        this.BLOCK_SIZE = 20; // 個数
        this.INNER_HEADER_HEIGHT = 45; // 内側のヘッダーの高さ px
        this.HEADER_HEIGHT = 60; // ヘッダーの高さ px
        this.FOOTER_HEIGHT = 49; // フッターの高さ px
        this.isEnd = false; // 終端フラグ
        this.isInitLoadDone = false; // 初回読み込み終了
        this.isNextData = false; // 次に表示する領域のバッファーの準備OKか
        this.nowLoading = false; // ロード中
        this.isManualScroll = false; // ユーザーの操作でスクロールイベントが発生したか
        this.items = [
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
                onClick: this.confirmRepairFlag
            },
            {
                label: 'プレビュー',
                onClick: this.preview
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
        console.log(httpService);
    }
    StorylistComponent.prototype.ngOnInit = function () {
        this.initScrollData();
    };
    StorylistComponent.prototype.onClickRefresh = function () {
        location.reload();
    };
    // データの初期化（無限スクロール部分）
    StorylistComponent.prototype.initScrollData = function () {
        var _this = this;
        // 左の検索画面の高さを、表示されている高さに固定する
        this.containerEl = document.getElementById("storylist-container");
        this.containerEl.style.height = window.innerHeight
            - this.HEADER_HEIGHT - this.FOOTER_HEIGHT - this.INNER_HEADER_HEIGHT + "px";
        this.searchConditionEl = document.getElementById("search-modal-container");
        // this.ROW_HEIGHT = document.querySelector("tbody tr").clientHeight;
        this.ROW_HEIGHT = 46;
        this.BLOCK_HEIGHT = this.ROW_HEIGHT * this.BLOCK_SIZE;
        // 初期表示データを取得
        this.getRecord(0, this.BLOCK_SIZE * 3)
            .then(function (result) {
            _this.record = result;
            _this.endRecord = _this.BLOCK_SIZE * 3;
            _this.startRow = 0;
            _this.endRow = _this.BLOCK_SIZE * 2; //表示末尾データの行番号
            _this.visible_zone = _this.record.slice(_this.startRow, _this.endRow); //40
            _this.isInitLoadDone = true; //初期処理完了フラグ
            console.log(_this.startRow + "to" + _this.endRow);
        });
    };
    // --------------------------
    // スクロールイベント処理
    // --------------------------
    StorylistComponent.prototype.onScrollStorylist = function (event) {
        // 初期処理完了前のスクロールイベントは無視
        if (!this.isInitLoadDone)
            return;
        if (this.isManualScroll) {
            this.isManualScroll = false;
            return;
        }
        // 画面のレイアウト情報取得
        var html = this.containerEl; // 記事検索画面のhtml要素
        var elemHeight = html.scrollHeight; // 全体の高さ
        var clientHeight = html.clientHeight; // 表示域の高さ
        var scrollPos = html.scrollTop; // スクロール位置
        this.bottom_margin = elemHeight - clientHeight - scrollPos; // 下方向スクロール可能サイズ
        var top_margin = scrollPos - this.searchConditionEl.offsetHeight - this.ROW_HEIGHT;
        // バッファ追加の判定(下方向)
        if (this.bottom_margin == 0 && !this.isEnd && !this.nowLoading && !this.isManualScroll) {
            // ロード中フラグを立てる
            this.nowLoading = true;
            this.onScrollDown();
            return;
        }
        // バッファ追加の判定(上方向)
        if (top_margin < 0 && !this.nowLoading && this.startRow != 0 && !this.isManualScroll) {
            // ロード中フラグを立てる
            this.nowLoading = true;
            this.onScrollUp();
            return;
        }
    };
    ;
    // バッファ追加(下方向)
    StorylistComponent.prototype.onScrollDown = function () {
        var _this = this;
        console.log("Scroll Down");
        //表示位置カウンタの更新
        this.startRow += this.BLOCK_SIZE;
        this.endRow += this.BLOCK_SIZE;
        this.visible_zone = this.record.slice(this.startRow, this.endRow);
        if (this.endRecord == this.endRow) {
            this.endRecord += this.BLOCK_SIZE;
        }
        else {
            console.log(this.startRow + " to " + this.endRow);
            this.nowLoading = false;
            return;
        }
        setTimeout(function () {
            _this.getNextBuffer();
        }, 1);
    };
    ;
    // 次に追加するバッファ作成(下方向)
    StorylistComponent.prototype.getNextBuffer = function () {
        var _this = this;
        this.getRecord(this.startRow + this.BLOCK_SIZE * 2, this.BLOCK_SIZE)
            .then(function (result) {
            // ロード中フラグを元に戻す
            _this.nowLoading = false;
            var rec = result;
            if (rec.length === _this.BLOCK_SIZE) {
                _this.isEnd = false;
                _this.record = _this.record.concat(rec);
            }
            else if (rec.length === 0) {
                _this.isEnd = true;
            }
            else {
                _this.isEnd = true;
                _this.record = _this.record.concat(rec);
                _this.visible_zone = _this.visible_zone.concat(rec);
            }
            //位置を調整する
            if (_this.bottom_margin == 0) {
                console.log("scroll back");
                _this.containerEl.scrollTop = _this.containerEl.scrollHeight - _this.containerEl.clientHeight
                    - document.getElementById("card_block").offsetHeight;
            }
            console.log(_this.startRow + " to " + _this.endRow);
        });
    };
    ;
    // バッファ追加（上方向）
    StorylistComponent.prototype.onScrollUp = function () {
        console.log("scroll Up");
        //表示位置カウンタの更新
        this.startRow -= this.BLOCK_SIZE;
        this.endRow -= this.BLOCK_SIZE;
        this.visible_zone = this.record.slice(this.startRow, this.endRow);
        console.log(this.startRow + " to " + this.endRow);
        this.containerEl.scrollTop = this.searchConditionEl.offsetHeight + this.ROW_HEIGHT + this.BLOCK_HEIGHT + 1;
        this.isManualScroll = true;
        this.nowLoading = false;
        this.isEnd = false;
    };
    ;
    //サーバーからデータ取得
    StorylistComponent.prototype.getRecord = function (begin, size) {
        //HTTPリクエスト条件設定
        var config = { offset: begin, limit: size };
        //HTTPリクエスト開始
        var observable = this.httpService.doHttp("story", config);
        return observable.toPromise(Promise); /* observableをPromiseに変換して返す */
    };
    // 記事編集
    StorylistComponent.prototype.editStory = function ($event) { };
    ;
    // 記事参照
    StorylistComponent.prototype.readStory = function ($event) { };
    ;
    // 直しあり確認済み
    StorylistComponent.prototype.confirmRepairFlag = function ($event) { };
    ;
    // プレビュー開始
    StorylistComponent.prototype.preview = function ($event) { };
    ;
    // URLをクリップボードにコピーする
    StorylistComponent.prototype.clipURL = function ($event) { };
    ;
    // 記事IDをクリップボードのコピーする
    StorylistComponent.prototype.clipStoryId = function ($event) { };
    ;
    // 記事をコピーして新規作成する
    StorylistComponent.prototype.copyStory = function ($event) { };
    ;
    // 記事を没にする
    StorylistComponent.prototype.disableStory = function ($event) { };
    ;
    StorylistComponent.prototype.clickEvent = function ($event) {
        console.log('clicked ', $event);
    };
    ;
    return StorylistComponent;
}());
StorylistComponent = __decorate([
    core_1.Component({
        selector: 'storylist',
        templateUrl: 'storylist.component.html',
        styleUrls: ['storylist.component.css']
    })
], StorylistComponent);
exports.StorylistComponent = StorylistComponent;
