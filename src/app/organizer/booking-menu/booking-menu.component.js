"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var toaster_component_1 = require("../toaster/toaster.component");
var BookingMenuComponent = (function () {
    function BookingMenuComponent(bd_service) {
        this.bd_service = bd_service;
    }
    BookingMenuComponent.prototype.ngOnInit = function () {
    };
    BookingMenuComponent.prototype.open = function (event) { };
    ;
    //予約解除ボタンを押した時の操作
    BookingMenuComponent.prototype.onClickCancel = function (event, story) {
        console.log("channel : " + this.channel_name + " index : " + this.index);
        var result = this.bd_service.clear(story, this.channel_name, this.index);
        if (result) {
            this.toasterComponent.showSuccess("予約を解除しました。タイトル : " + story.title);
        }
        else {
            this.toasterComponent.showWarning("予約を解除出ませんでした。");
        }
    };
    ;
    return BookingMenuComponent;
}());
__decorate([
    core_1.Input("stories")
], BookingMenuComponent.prototype, "stories", void 0);
__decorate([
    core_1.Input("channel_name")
], BookingMenuComponent.prototype, "channel_name", void 0);
__decorate([
    core_1.Input("index")
], BookingMenuComponent.prototype, "index", void 0);
__decorate([
    core_1.ViewChild(material_1.MdMenuTrigger)
], BookingMenuComponent.prototype, "mdMenuTrigger", void 0);
__decorate([
    core_1.ViewChild(toaster_component_1.ToasterComponent)
], BookingMenuComponent.prototype, "toasterComponent", void 0);
BookingMenuComponent = __decorate([
    core_1.Component({
        selector: 'app-booking-menu',
        templateUrl: './booking-menu.component.html',
        styleUrls: ['booking-menu.component.css']
    })
], BookingMenuComponent);
exports.BookingMenuComponent = BookingMenuComponent;
