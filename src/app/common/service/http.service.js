"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var HttpService = (function () {
    function HttpService(http) {
        this.http = http;
        this.api = {
            test: "./cms/santaroAPI/getReturnTest.json",
            story: "./cms/santaroAPI/getStories.json",
            tab_channel: "./cms/santaroAPI/getTabChannels.json",
            select_credit: "./cms/santaroAPI/getCredits.json",
            select_tag: "./cms/santaroAPI/getTags.json",
            channels: "./cms/santaroAPI/getChannels.json",
        };
    }
    HttpService.prototype.doHttp = function (type, params) {
        if (params === void 0) { params = {}; }
        var options = this.makeRequestConfig(type, params);
        return this.fetch(options);
    };
    HttpService.prototype.makeRequestConfig = function (type, params) {
        if (params === void 0) { params = {}; }
        var param = new http_1.URLSearchParams();
        if (params != {}) {
            for (var key in params) {
                param.set(key, params[key]);
            }
        }
        //通信設定オブジェクト作成
        var options = {
            method: "get",
            url: this.api[type],
            search: param
        };
        return new http_1.RequestOptions(options);
    };
    HttpService.prototype.fetch = function (options) {
        return this.http.request(new http_1.Request(options)).map(function (res) { return res.json(); });
    };
    HttpService.prototype.test = function (options) {
        return this.http.request(new http_1.Request(options));
    };
    return HttpService;
}());
HttpService = __decorate([
    core_1.Injectable()
], HttpService);
exports.HttpService = HttpService;
