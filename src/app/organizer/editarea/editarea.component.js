"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var booking_menu_component_1 = require("../booking-menu/booking-menu.component");
var toaster_component_1 = require("../toaster/toaster.component");
var EditareaComponent = (function () {
    function EditareaComponent(bd_service) {
        var _this = this;
        this.bd_service = bd_service;
        //このインスタンスが持つ編成内容
        this.list = [];
        //１つ上に予約する
        this.bookingUpper = function (story_obj) {
            var result = _this.bd_service.bookingUpper(story_obj);
            if (result) {
                _this.removeStoryFromList(story_obj);
            }
            else {
                _this.toasterComponent.showWarning('予約できませんでした。');
            }
        };
        //１つ下に予約する
        this.bookingLower = function (story_obj) {
            var result = _this.bd_service.bookingLower(story_obj);
            if (result) {
                _this.removeStoryFromList(story_obj);
            }
            else {
                _this.toasterComponent.showWarning('予約できませんでした。');
            }
        };
        //予約リスト確認ボタンを行に表示するか否かを返す
        this.showBookingListButton = function (channel_name, index) {
            return _this.bd_service.showBookingListButton(channel_name, index);
        };
        this.initContextMenu();
    }
    ;
    //予約リストのオープンボタンのイベント処理
    EditareaComponent.prototype.onClickBookingMenu = function (event) {
        this.bookingMenuComponent.open(event);
    };
    ;
    //編成リストに追加する
    EditareaComponent.prototype.addTo = function ($event) {
        //同じものは追加できない
        for (var i in this.list) {
            if (this.list[i]["id"] == $event.dragData.id) {
                return;
            }
        }
        this.list.push($event.dragData);
        console.log("add");
        console.log(this.list);
    };
    ;
    //記事を編成リストから削除する
    EditareaComponent.prototype.removeStoryFromList = function (story_obj) {
        var data = story_obj.dataContext;
        var story = data.story;
        for (var i in this.list) {
            if (this.list[i] === story) {
                this.list.splice(parseInt(i), 1);
                console.log("remove");
                console.log("index ; " + i);
                console.log(this.list);
            }
        }
    };
    ;
    //予約リストを返す
    EditareaComponent.prototype.getBookingStoriesToShow = function (channel_name, index) {
        return this.bd_service.getBookingStoriesToShow(channel_name, index);
    };
    ;
    //配列を受け取って、開業付きのHTMLで返す
    EditareaComponent.prototype.returnArrayWithLineFeed = function (array) {
        if (array === void 0) { array = []; }
        var html = "";
        for (var i in array) {
            html += (array[i] + "<br>");
        }
        //nullを消去する
        html = html.replace('null', "");
        return html;
    };
    ;
    //コンテクストメニューの内容を初期化する
    EditareaComponent.prototype.initContextMenu = function () {
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
            ];
    };
    ;
    //編成リストのヘッダーの内容を返す
    EditareaComponent.prototype.setHeaders = function () {
        return [
            {
                name: "順位",
                col_span: 5
            },
            {
                name: "",
                col_span: 2,
                option: "clear"
            },
            {
                name: "",
                col_span: 1
            },
            {
                name: "ジャンル",
                col_span: 10
            },
            {
                name: "画像",
                col_span: 10
            },
            {
                name: "記事 / 公開日時 CP",
                col_span: 40
            },
            {
                name: "トピ/殿堂/タブ",
                col_span: 20
            },
            {
                name: "状態",
                col_span: 6
            },
            {
                name: "予約",
                col_span: 6
            }
        ];
    };
    return EditareaComponent;
}());
__decorate([
    core_1.ViewChild(booking_menu_component_1.BookingMenuComponent)
], EditareaComponent.prototype, "bookingMenuComponent", void 0);
__decorate([
    core_1.ViewChild(toaster_component_1.ToasterComponent)
], EditareaComponent.prototype, "toasterComponent", void 0);
exports.EditareaComponent = EditareaComponent;
