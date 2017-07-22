"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ChannelSelectTreeViewComponent = (function () {
    function ChannelSelectTreeViewComponent(sc_service, channelConditionService) {
        this.sc_service = sc_service;
        this.channelConditionService = channelConditionService;
        this.is_initial_event = true;
        channelConditionService.refreshChannelMaster();
        // 検索条件を格納するオブジェクトをコピー
        this.input = sc_service.searchCondition;
        // tree-viewのitemを取得
        this.channel_list = this.channelConditionService.treeViewItem;
        //tree-viewの設定
        this.treeViewConfig = {
            isShowAllCheckBox: false,
            isShowFilter: true,
            isShowCollapseExpand: false,
            maxHeight: 500
        };
    }
    ChannelSelectTreeViewComponent.prototype.ngOnInit = function () { };
    // 変更があった時の処理
    // 検索条件に追加する
    ChannelSelectTreeViewComponent.prototype.onSelectedChange = function ($event) {
        if (this.is_initial_event) {
            this.is_initial_event = false;
            return;
        }
        // インスタンスの参照を保持したまま配列の内容を更新する
        if (!this.input[this.label.name]) {
            this.input[this.label.name] = [];
        }
        this.input[this.label.name].length = 0;
        for (var key in $event) {
            this.input[this.label.name].push($event[key]);
        }
    };
    return ChannelSelectTreeViewComponent;
}());
__decorate([
    core_1.Input("label")
], ChannelSelectTreeViewComponent.prototype, "label", void 0);
ChannelSelectTreeViewComponent = __decorate([
    core_1.Component({
        selector: 'app-channel-select-tree-view',
        templateUrl: './channel-select-tree-view.component.html',
        styleUrls: ['./channel-select-tree-view.component.css']
    })
], ChannelSelectTreeViewComponent);
exports.ChannelSelectTreeViewComponent = ChannelSelectTreeViewComponent;
