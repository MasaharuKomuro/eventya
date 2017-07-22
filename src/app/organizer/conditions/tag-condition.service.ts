import { Injectable } from '@angular/core';
import {HttpService} from "../../common/service/http.service";
import {TreeviewItem} from "ng2-dropdown-treeview";
import {SearchConditionService} from "../search-conditions/search-condition.service";
import {Converter} from "../form-util/Converter";

@Injectable()
//タグのマスターデータを管理する
export class TagConditionService {

  constructor(private httpService: HttpService) {}

  private static tagMaster = [];   // タグのマスタデータ
  public         treeViewItem: TreeviewItem[] = [];
  public         disp_tags = [];   // 検索条件に表示するタグの配列
  private        input;

  // タグマスタを更新する（モーダルを開くごとに更新）
  refreshTagCondition() {
    // タグの情報を取得
    this.httpService.doHttp("tags", {site_id: this.httpService.site_id, recursive: true }, "Get", "json").subscribe( ( tag_list ) =>
    {
      console.log(tag_list);
      // jsonの形式を変換、タグマスタをセット
      TagConditionService.tagMaster = Converter.convertForTreeView(tag_list, "tag"); //For

      // JSON obj => TreeViewItem[]
      this.treeViewItem.length = 0;
      for ( let key in tag_list ) {
        if (tag_list.hasOwnProperty(key)) {
          this.treeViewItem.push(new TreeviewItem(tag_list[key], true));
        }
      }

      this.input = SearchConditionService.searchCondition;

      // inputを見て、選択されているタグにchecked=trueを付与する
      this.setTreeViewChecked(this.treeViewItem);

      // 親タグのチェックを正しく調整する
      for ( let key in this.treeViewItem ) {
        this.treeViewItem[key].correctChecked();
      }

      // 検索条件に表示するタグ情報を初期化する
      this.disp_tags.length = 0;
      this.setDispTags(this.treeViewItem);
    } );
  }

  // 検索条件に表示するタグの配列をセットする
  private setDispTags(treeViewItem) {
    for (let key1 in treeViewItem ) {
      if (treeViewItem.hasOwnProperty(key1)) {
        for (let key2 in this.input.tags) {
          if (this.input.tags.hasOwnProperty(key2)) {
            if (treeViewItem[key1].value == this.input.tags[key2]) {
              this.disp_tags.push(treeViewItem[key1].name);
            }
          }
        }
        if (treeViewItem[key1]["children"]) {
          this.setDispTags(treeViewItem[key1]["children"]);
        }
      }
    }
  }

  // inputを見て、選択されているタグにchecked=trueを付与する
  private setTreeViewChecked(treeViewItem){
    if ( !this.input.tags ) {
      this.uncheckedAll(treeViewItem);
      return;
    }
    for ( let key1 in treeViewItem ) {
      if (treeViewItem.hasOwnProperty(key1)) {
        treeViewItem[key1]["collapsed"] = true; // 親ジャンルには標準で閉じておくオプションを追加
        treeViewItem[key1]["checked"] = false;
        for (let key2 in this.input.tags) {
          if (this.input.tags.hasOwnProperty(key2)) {
            if (treeViewItem[key1].value == this.input.tags[key2]) {
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

  public static getTagMaster = function(): any {
    return TagConditionService.tagMaster;
  }

}
