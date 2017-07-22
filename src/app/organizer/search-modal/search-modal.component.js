"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SearchModalComponent = (function () {
    function SearchModalComponent(sc_service, channelConditionService) {
        this.sc_service = sc_service;
        this.channelConditionService = channelConditionService;
        this.labels = {};
        //ラベル情報を取得
        this.labels = sc_service.setLabels();
        //ユーザの入力内容を取得
        this.input = sc_service.searchCondition;
    }
    SearchModalComponent.prototype.ngOnInit = function () {
    };
    //検索ボタンを押した時の動作
    SearchModalComponent.prototype.runSearch = function () {
        //検索条件に表示するジャンル情報をセットする
        this.channelConditionService.refreshChannelMaster();
        // 検索条件をローカルストレージに保存
        this.sc_service.saveSearchCondition();
    };
    //リセットボタンを押した時の動作
    SearchModalComponent.prototype.clear = function () {
        this.sc_service.clear();
    };
    //キャンセルボタンを押した時の動作
    SearchModalComponent.prototype.cancel = function () {
        // this.input = this.sc_service.cancel();
        console.log("click cancel");
    };
    // ジャンル選択ツリービューの内容を更新する（モーダルを開くごとに更新）
    SearchModalComponent.prototype.refreshChannelMaster = function () {
        this.channelConditionService.refreshChannelMaster();
    };
    SearchModalComponent.prototype.debugModal = function () {
        console.log(this.input);
    };
    return SearchModalComponent;
}());
SearchModalComponent = __decorate([
    core_1.Component({
        selector: 'app-search-modal',
        templateUrl: 'search-modal.component.html',
        styleUrls: ['search-modal.component.css']
    })
], SearchModalComponent);
exports.SearchModalComponent = SearchModalComponent;
