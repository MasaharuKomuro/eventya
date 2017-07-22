"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BookingDataService = (function () {
    function BookingDataService() {
        this.bookingList = [];
    }
    //予約リストを返す
    BookingDataService.prototype.getBookingStoriesToShow = function (channel_name, index) {
        if (this.bookingList[channel_name]) {
            if (this.bookingList[channel_name][index]) {
                return this.bookingList[channel_name][index];
            }
        }
        else {
            return [];
        }
    };
    //予約リスト確認ボタンを行に表示するか否かを返す
    BookingDataService.prototype.showBookingListButton = function (channel_name, index) {
        if (this.bookingList[channel_name]) {
            if (this.bookingList[channel_name][index]) {
                if (this.bookingList[channel_name][index][0] != null) {
                    return true;
                }
            }
            return false;
        }
        return false;
    };
    //１つ上に予約する
    BookingDataService.prototype.bookingUpper = function (story_obj) {
        var data = story_obj.dataContext;
        var story = data.story;
        var index = data.index - 1;
        var channel_name = data.channel_name;
        if (index < 0) {
            return false;
        }
        if (!this.bookingList[channel_name]) {
            this.bookingList[channel_name] = [];
            this.bookingList[channel_name][index] = [];
        }
        else if (!(index in this.bookingList[channel_name])) {
            this.bookingList[channel_name][index] = [];
        }
        //記事を重複して予約することはできない
        for (var i in this.bookingList[channel_name][index]) {
            if (this.bookingList[channel_name][index][i]["id"] === story.id) {
                return false;
            }
        }
        this.bookingList[channel_name][index].push(story);
        return true;
    };
    ;
    //１つ下に予約する
    BookingDataService.prototype.bookingLower = function (story_obj) {
        var data = story_obj.dataContext;
        var story = data.story;
        var index = data.index + 1;
        var channel_name = data.channel_name;
        if (index > 7) {
            return false;
        }
        if (!this.bookingList[channel_name]) {
            this.bookingList[channel_name] = [];
            this.bookingList[channel_name][index] = [];
        }
        else if (!(index in this.bookingList[channel_name])) {
            this.bookingList[channel_name][index] = [];
        }
        //記事を重複して予約することはできない
        for (var i in this.bookingList[channel_name][index]) {
            if (this.bookingList[channel_name][index][i]["id"] === story.id) {
                return false;
            }
        }
        this.bookingList[channel_name][index].push(story);
        return true;
    };
    //予約を解除する
    BookingDataService.prototype.clear = function (story, channel_name, index) {
        if (this.bookingList[channel_name]) {
            if (this.bookingList[channel_name][index]) {
                for (var i in this.bookingList[channel_name][index]) {
                    if (this.bookingList[channel_name][index][i] == story) {
                        this.bookingList[channel_name][index].splice(i, 1);
                        return true;
                    }
                }
            }
        }
        return false;
    };
    return BookingDataService;
}());
BookingDataService = __decorate([
    core_1.Injectable()
], BookingDataService);
exports.BookingDataService = BookingDataService;
