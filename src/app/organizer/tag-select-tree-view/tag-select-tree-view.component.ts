import { Component, Input, OnInit } from '@angular/core';
import { DownlineTreeviewEventParser, DownlineTreeviewItem, TreeviewConfig,
         TreeviewEventParser, TreeviewItem } from 'ng2-dropdown-treeview';
import { SearchConditionService } from '../search-conditions/search-condition.service';
import { TagConditionService } from '../conditions/tag-condition.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-tag-select-tree-view',
  templateUrl: './tag-select-tree-view.component.html',
  styleUrls: ['./tag-select-tree-view.component.css'],
  providers: [
    { provide: TreeviewEventParser, useClass: DownlineTreeviewEventParser}
  ]
})
export class TagSelectTreeViewComponent implements OnInit {

  public  tag_list: TreeviewItem[];        // チャネル（ジャンル）のオブジェクトの配列
  public  treeViewConfig: TreeviewConfig;  // ツリービューの設定
  private searchCondition;                 // 検索条件
  private is_initial_event = true;         // tree-viewコンポーネント生成時に実行されるイベントは無視する
  private $: any;

  @Input('label') label;

  constructor(
    private tagConditionService: TagConditionService
  ) {
    this.$ = require('jquery');

    tagConditionService.refreshTagCondition();

    // 検索条件を格納するオブジェクトをコピー
    this.searchCondition = SearchConditionService.searchCondition;

    // tree-viewのitemを取得
    this.tag_list = this.tagConditionService.treeViewItem;

    // tree-viewの設定
    this.treeViewConfig = {
      isShowAllCheckBox: false,      // 全てを選択ボタンの表示/非表示
      isShowFilter: true,            // 検索欄の表示/非表示
      isShowCollapseExpand: false,   // 伸縮ボタンの表示/非表示
      maxHeight: 500
    };
  }

  ngOnInit() {}

  // 変更があった時の処理
  // 検索条件に追加する
  public onSelectedChange(downlineItems: DownlineTreeviewItem[]){
    // 起動時に発生するイベントは無視
    if ( this.is_initial_event ) {
      console.log('tag tree view initial event');
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
      // 選択された要素に親要素があり、その親要素が選択されていれば検索条件に追加する
      let parent = downlineItem.parent;
      while (!_.isNull(parent)) {
        if (parent.item.checked &&                                           // チェックされている
          this.$.inArray(parent.item.value, this.searchCondition[name]) < 1  // 検索条件に登録されていない
        ) {
          this.searchCondition[name].push(parent.item.value);
        }
        parent = parent.parent;
      }

    });
    console.log('チャネル条件を追加');
    console.log(this.searchCondition[name]);
  }

}
