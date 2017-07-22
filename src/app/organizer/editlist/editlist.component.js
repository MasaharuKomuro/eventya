"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var EditlistComponent = (function () {
    function EditlistComponent(service) {
        this.service = service;
        this.delete = [];
        this.BLOCK_SIZE = 30;
        this.HEADER_HEIGHT = 60;
        this.FOOTER_HEIGHT = 49;
        this.INNER_HEADER_HEIGHT = 45;
    }
    EditlistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.doHttp("tab_channel").subscribe(function (tab_channels) { return _this.tab_channels = tab_channels; });
        this.initPageSize();
    };
    EditlistComponent.prototype.initPageSize = function () {
        // 編成画面の高さを、表示されている高さに固定する
        this.containerEl = document.getElementById("editlist_container");
        this.containerEl.style.height = window.innerHeight
            - this.HEADER_HEIGHT - this.FOOTER_HEIGHT - this.INNER_HEADER_HEIGHT + "px";
    };
    EditlistComponent.prototype.debug_editlist = function () {
        console.log(this.tab_channels);
    };
    EditlistComponent.prototype.onClickRefresh = function () {
        location.reload();
    };
    return EditlistComponent;
}());
EditlistComponent = __decorate([
    core_1.Component({
        selector: 'editlist',
        templateUrl: './editlist.component.html',
        styleUrls: ['./editlist.component.css']
    })
], EditlistComponent);
exports.EditlistComponent = EditlistComponent;
