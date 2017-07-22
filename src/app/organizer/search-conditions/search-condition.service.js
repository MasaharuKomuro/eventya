"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var KEY = "search_condition";
var SearchConditionService = (function () {
    function SearchConditionService() {
        this.searchCondition = {};
        this.searchCondition = this.fetch();
        console.log(this.fetch());
        this.init();
    }
    //ローカルストレージから検索条件を取得
    SearchConditionService.prototype.fetch = function () {
        return JSON.parse(localStorage.getItem(KEY)) || {};
    };
    //ローカルストレージに検索条件を保存
    SearchConditionService.prototype.saveSearchCondition = function () {
        console.log(this.searchCondition);
        localStorage.setItem(KEY, JSON.stringify(this.searchCondition));
    };
    ;
    //データをリセット
    SearchConditionService.prototype.clear = function () {
        //配列の全要素を削除する
        for (var key in this.searchCondition) {
            delete this.searchCondition[key];
        }
        this.init();
        //ローカルストレージから削除
        localStorage.removeItem(KEY);
    };
    //キャンセルボタンがおされたときの処理
    //ローカルストレージから保存内容を読み出す
    SearchConditionService.prototype.cancel = function () {
        return JSON.parse(localStorage.getItem(KEY)) || {};
    };
    //初期値を設定する
    SearchConditionService.prototype.init = function () {
        if (!this.searchCondition['sort']) {
            this.searchCondition['sort'] = 'sort-draft';
        }
    };
    SearchConditionService.prototype.setLabels = function () {
        return {
            channel: [
                {
                    label: "ジャンル",
                    name: "channel",
                    type: "channel"
                },
            ],
            text: [
                {
                    label: "タイトル",
                    name: "title",
                    placeholder: "タイトル",
                    type: "text"
                },
                {
                    label: "本文",
                    name: "body",
                    placeholder: "本文",
                    type: "text"
                }
            ],
            datetime: [
                {
                    label: "入稿日時",
                    name: "draft",
                    type: "datetime"
                },
                {
                    label: "公開日時",
                    name: "publish_date",
                    type: "datetime"
                },
                {
                    label: "更新日時",
                    name: "updated_at",
                    type: "datetime"
                },
                {
                    label: "編集見出し付与日時",
                    name: "edit_title",
                    type: "datetime"
                }
            ],
            select: [
                {
                    label: "CP",
                    name: "credit",
                    type: "select",
                    option: "credit"
                },
                {
                    label: "タグ",
                    name: "tag",
                    type: "select",
                    option: "tag"
                }
            ],
            checkbox: [
                {
                    label: "編集見出し入力済み",
                    name: "edited_short_title",
                    type: "checkbox"
                },
                {
                    label: "直しあり",
                    name: "is_fix",
                    type: "checkbox"
                },
                {
                    label: "トピ掲載済み",
                    name: "published_in_topics",
                    type: "checkbox"
                },
                {
                    label: "殿堂掲載済み",
                    name: "published_in_Fame",
                    type: "checkbox"
                },
                {
                    label: "タブ掲載済み",
                    name: "published_in_tab",
                    type: "checkbox"
                }
            ],
            sort: [
                {
                    label: "入稿日時",
                    name: "sort-draft",
                    type: "sort-checkbox"
                },
                {
                    label: "編集見出し更新日時",
                    name: "sort-edited_short_title",
                    type: "sort-checkbox"
                },
                {
                    label: "公開日時",
                    name: "sort-published_at",
                    type: "sort-checkbox"
                },
                {
                    label: "更新日時",
                    name: "sort-updated_at",
                    type: "sort-checkbox"
                }
            ]
        };
    };
    return SearchConditionService;
}());
SearchConditionService = __decorate([
    core_1.Injectable()
], SearchConditionService);
exports.SearchConditionService = SearchConditionService;
