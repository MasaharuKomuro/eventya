import { Injectable } from '@angular/core';
import { HttpService } from "../../common/service/http.service";
import { TreeviewItem } from "ng2-dropdown-treeview";
import { SearchConditionService } from "../search-conditions/search-condition.service";
import { Converter } from "../form-util/Converter";

@Injectable()
//チャネルのマスターデータを管理する
export class ChannelConditionService {

  constructor(
    private httpService: HttpService,
  ) {}

  private static channelMaster = [];   // チャネルのマスタデータ
  public         treeViewItem: TreeviewItem[] = [];
  public         disp_channels = [];   // 検索条件に表示するチャネルの配列
  private        input;                // 検索条件の入力値

  // チャネルマスタを更新する（モーダルを開くごとに更新）
  // 最新のチャネルマスタを取得する
  refreshChannelCondition() {
    // チャンネルの情報を取得
    this.httpService.doHttp("channels", {site_id: this.httpService.site_id, recursive: true }, "Get", "json").subscribe( ( channel_list ) =>
    {
      console.log(channel_list);
      // jsonの形式を変換、チャネルマスタをセット
      ChannelConditionService.channelMaster = Converter.convertForTreeView(channel_list, "channel");

      // JSON obj => TreeViewItem[]
      this.treeViewItem.length = 0;
      for ( let key in channel_list ) {
        if (channel_list.hasOwnProperty(key)) {
          console.log(channel_list[key]);
          this.treeViewItem.push(new TreeviewItem(channel_list[key], true));
        }
      }

      this.input = SearchConditionService.searchCondition;
      // inputを見て、選択されているチャネルにchecked=trueを付与する
      this.setTreeViewChecked(this.treeViewItem);

      // 親チャネルのチェックを正しく調整する
      for ( let key in this.treeViewItem ) {
        this.treeViewItem[key].correctChecked();
      }

      // 検索条件に表示するチャネル情報を初期化する
      this.disp_channels.length = 0;
      this.setDispChannels(this.input);
    } );
  }

  // 検索条件に表示するチャネルの配列をセットする
  // ex) ["野球", "サッカー", "社会"] => ["スポーツ", "国内"]
  private setDispChannels(input) {
    for ( let key in input.channels ) {
      if (input.channels.hasOwnProperty(key)) {
        let parent_channel = this.searchParent(input.channels[key]);
        if (this.disp_channels.indexOf(parent_channel) < 0) {
          this.disp_channels.push(parent_channel);
        }
      }
    }
  }

  // 受け取った子チャネルの親チャネルを返す
  private searchParent(input){
    if ( !ChannelConditionService.channelMaster ) return false;
    for ( let key1 in ChannelConditionService.channelMaster ) {
      for ( let key2 in ChannelConditionService.channelMaster[key1].children ) {
        if (ChannelConditionService.channelMaster[key1].children.hasOwnProperty(key2)) {
          if (ChannelConditionService.channelMaster[key1].children[key2].value == input) {
            return ChannelConditionService.channelMaster[key1].name;
          }
        }
      }
    }
  }

  // search modalの検索条件を設定する部分
  // inputを見て、選択済みのチャネルにchecked=trueを付与する
  private setTreeViewChecked(treeViewItem){
    if ( !this.input.channels ) {　
      this.uncheckedAll(treeViewItem);
      return;　
    }
    for ( let key1 in treeViewItem ) {
      if (treeViewItem.hasOwnProperty(key1)) {
        treeViewItem[key1]["collapsed"] = true; // 親ジャンルには標準で閉じておくオプションを追加
        treeViewItem[key1]["checked"] = false;
        for (let key2 in this.input.channels) {
          if (this.input.channels.hasOwnProperty(key2)) {
            if (treeViewItem[key1].value == this.input.channels[key2]) {
              treeViewItem[key1]["checked"] = true;
            }
          }
        }
        // 子要素がある場合は再帰的に処理する
        if (treeViewItem[key1]["children"]) {
          this.setTreeViewChecked(treeViewItem[key1]["children"]);
        }
      }
    }
  }

  // 全て未選択にする
  private uncheckedAll(treeViewItem) {
    for ( let key in treeViewItem ) {
      if (treeViewItem.hasOwnProperty(key)) {
        treeViewItem[key]["checked"] = false;
        treeViewItem[key]["collapsed"] = true;
        if (treeViewItem[key]["children"]) {
          this.uncheckedAll(treeViewItem[key]["children"]);
        }
      }
    }
  }

}
