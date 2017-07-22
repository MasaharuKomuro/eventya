"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var editarea_component_1 = require("../editarea/editarea.component");
var ChannelListComponent = (function (_super) {
    __extends(ChannelListComponent, _super);
    function ChannelListComponent(bd_service) {
        var _this = _super.call(this, bd_service) || this;
        _this.channelList = [];
        _this.headers = [];
        _this.channelList = _this.list;
        _this.headers = _this.setHeaders();
        return _this;
    }
    ChannelListComponent.prototype.ngOnInit = function () { };
    ChannelListComponent.prototype.save = function () { };
    ChannelListComponent.prototype.debugChannel = function () {
        console.log(this.channelList);
    };
    return ChannelListComponent;
}(editarea_component_1.EditareaComponent));
__decorate([
    core_1.Input("tab_channel")
], ChannelListComponent.prototype, "tab_channel", void 0);
ChannelListComponent = __decorate([
    core_1.Component({
        selector: 'app-channel-list',
        templateUrl: './channel-list.component.html',
        styleUrls: ['./channel-list.component.css']
    })
], ChannelListComponent);
exports.ChannelListComponent = ChannelListComponent;
