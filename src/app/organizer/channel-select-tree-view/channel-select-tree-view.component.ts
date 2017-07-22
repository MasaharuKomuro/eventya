import { Component, Input, OnInit } from '@angular/core';
import {DownlineTreeviewEventParser, DownlineTreeviewItem, TreeviewConfig}           from "ng2-dropdown-treeview";
import { SearchConditionService }   from "../search-conditions/search-condition.service";
import { ChannelConditionService }  from "../conditions/channel-condition.service";
import * as _ from 'lodash';
import { TreeviewEventParser } from "ng2-dropdown-treeview/src/treeview-event-parser";


@Component({
  selector: 'app-channel-select-tree-view',
  templateUrl: './channel-select-tree-view.component.html',
  styleUrls: ['./channel-select-tree-view.component.css'],
  providers: [
    { provide: TreeviewEventParser, useClass: DownlineTreeviewEventParser}
  ]
})

export class ChannelSelectTreeViewComponent implements OnInit {

  private channel_list; 　　　　　　　　　　 // チャネル（ジャンル）のオブジェクトの配列
  private treeViewConfig: TreeviewConfig; // ツリービューの設定
  private searchCondition;                // 検索条件の入力値
  private is_initial_event = true;        // 最初の呼び出しか
  private $: any;

  @Input("label") label; // この検索条件の表示名称

  constructor(
    private channelConditionService: ChannelConditionService
  )
  {
    this.$ = require('jquery');

    this.channelConditionService.refreshChannelCondition();

    // 検索条件を格納するオブジェクトをコピー
    this.searchCondition = SearchConditionService.searchCondition;

    // tree-viewのitemを取得
    this.channel_list = this.channelConditionService.treeViewItem;

    //tree-viewの設定
    this.treeViewConfig = {
      isShowAllCheckBox: true,       // 全てを選択ボタンの表示/非表示
      isShowFilter: true,            // 検索欄の表示/非表示
      isShowCollapseExpand: false,   // 伸縮ボタンの表示/非表示
      maxHeight: 500
    };
  }

  ngOnInit() {}

  // 変更があった時の処理
  // 検索条件に追加する
  private onSelectedChange(downlineItems: DownlineTreeviewItem[]){
    // 起動時に発生するイベントは無視
    if ( this.is_initial_event ) {
      console.log("channel tree view initial event");
      this.is_initial_event = false;
      return;
    }
    const name = this.label.name;
    // インスタンスの参照を保持したまま配列の内容を更新する
    if ( !this.searchCondition[name] ) {
      this.searchCondition[name] = [];
    }
    this.searchCondition[name].length = 0;
    downlineItems.forEach((downlineItem) => {
      // 選択されてる要素（子要素のみ）を追加
      this.searchCondition[this.label.name].push(downlineItem.item.value);
      //　選択された要素に親要素があり、その親要素が選択されていれば検索条件に追加する
      let parent = downlineItem.parent;
      while (!_.isNull(parent)) {
        if (parent.item.checked &&                                            // チェックされている
           this.$.inArray(parent.item.value, this.searchCondition[name]) < 1  // 検索条件に登録されていない
        ) {
          this.searchCondition[name].push(parent.item.value);
        }
        parent = parent.parent;
      }

    });
    console.log("チャネル条件を追加");
    console.log(this.searchCondition[name]);
  }

}
