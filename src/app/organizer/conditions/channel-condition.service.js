"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng2_dropdown_treeview_1 = require("ng2-dropdown-treeview");
var ChannelConditionService = (function () {
    function ChannelConditionService(httpService, channelService, searchConditionService) {
        this.httpService = httpService;
        this.channelService = channelService;
        this.searchConditionService = searchConditionService;
        this.channelMaster = []; // チャネルのマスタデータ
        this.treeViewItem = [];
        this.disp_channels = []; // 検索条件に表示するチャネルの配列
    }
    // チャネルマスタを更新する（モーダルを開くごとに更新）
    ChannelConditionService.prototype.refreshChannelMaster = function () {
        var _this = this;
        // チャンネルの情報を取得
        this.httpService.doHttp("channels").subscribe(function (channel_list) {
            // jsonの形式を変換、チャネルマスタをセット
            _this.channelMaster = _this.channelService.convertForTreeView(channel_list); //For
            // JSON obj => TreeViewItem[]
            _this.treeViewItem.length = 0;
            for (var key in channel_list) {
                _this.treeViewItem.push(new ng2_dropdown_treeview_1.TreeviewItem(channel_list[key], true));
            }
            _this.input = _this.searchConditionService.searchCondition;
            // inputを見て、選択されているチャネルにchecked=trueを付与する
            _this.setTreeViewChecked();
            // 親チャネルのチェックを正しく調整する
            for (var key in _this.treeViewItem) {
                _this.treeViewItem[key].correctChecked();
            }
            // 検索条件に表示するチャネル情報を初期化する
            _this.setDispChannels(_this.input);
        });
    };
    // 検索条件に表示するチャネルの配列をセットする
    // ex) ["野球", "サッカー", "社会"] => ["スポーツ", "国内"]
    ChannelConditionService.prototype.setDispChannels = function (inputs) {
        for (var key in inputs.channel) {
            var parent_channel = this.searchParent(inputs.channel[key]);
            if (this.disp_channels.indexOf(parent_channel) < 0) {
                this.disp_channels.push(parent_channel);
            }
        }
    };
    // 受け取った子チャネルの親チャネルを返す
    ChannelConditionService.prototype.searchParent = function (input) {
        if (!this.channelMaster)
            return false;
        for (var key1 in this.channelMaster) {
            for (var key2 in this.channelMaster[key1].children) {
                if (this.channelMaster[key1].children[key2].value == input) {
                    return this.channelMaster[key1].text;
                }
            }
        }
    };
    // inputを見て、選択されているチャネルにchecked=trueを付与する
    ChannelConditionService.prototype.setTreeViewChecked = function () {
        if (!this.input.channel)
            return false;
        for (var key1 in this.treeViewItem) {
            // this.treeViewItem[key1]["checked"] = true;
            for (var key2 in this.treeViewItem[key1].children) {
                this.treeViewItem[key1].children[key2]["checked"] = false;
                for (var key3 in this.input.channel) {
                    if (this.treeViewItem[key1].children[key2].value == this.input.channel[key3]) {
                        this.treeViewItem[key1].children[key2]["checked"] = true;
                    }
                }
                if (!this.treeViewItem[key1].children[key2]["checked"]) {
                    // this.treeViewItem[key1]["checked"] = false;
                }
            }
        }
    };
    return ChannelConditionService;
}());
ChannelConditionService = __decorate([
    core_1.Injectable()
    //チャネルのマスターデータを管理する
], ChannelConditionService);
exports.ChannelConditionService = ChannelConditionService;
