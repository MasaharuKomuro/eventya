import { Injectable } from '@angular/core';
import {ChannelConditionService} from "../conditions/channel-condition.service";
import {TagConditionService} from "../conditions/tag-condition.service";

const KEY = "search_condition";

@Injectable()
export class SearchConditionService {

  public static searchCondition = {};

  constructor(
    private channelConditionService: ChannelConditionService,
    private tagConditionService: TagConditionService
  ) {
    SearchConditionService.searchCondition = SearchConditionService.fetch();
    console.log(SearchConditionService.fetch());
    this.init();
  }

  //ローカルストレージから検索条件を取得
  static fetch() {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  }

  //ローカルストレージに検索条件を保存
  public static saveSearchCondition() {
    console.log(SearchConditionService.searchCondition);
    localStorage.setItem(KEY, JSON.stringify(SearchConditionService.searchCondition));
  };

  //データをリセット
  public clear() {
    //配列の全要素を削除する
    for (let key in SearchConditionService.searchCondition) {
      delete SearchConditionService.searchCondition[key];
    }
    this.init();
    //ローカルストレージから削除
    localStorage.removeItem(KEY);
  }

  //キャンセルボタンがおされたときの処理
  //ローカルストレージから保存内容を読み出す
  cancel() {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  }

  //初期値を設定する
  init() {
    if (!SearchConditionService.searchCondition['sort']) {
      SearchConditionService.searchCondition['sort'] = 'created_at';
    }
  }

  public static setLabels() {
    return SearchConditionService.labels;
  }

  static labels = {
    channel: [
      {
        label: "ジャンル",
        name: "channels",
        type: "channels"
      },
    ],
    text: [
      {
        label: "タイトル",
        name: "title",
        placeholder: "タイトル",
        type: "text"
      },
      {
        label: "本文",
        name: "body",
        placeholder: "本文",
        type: "text"
      }
    ],
    datetime: [
      {
        label: "入稿日時",
        name: "created_at",
        type: "datetime"
      },
      {
        label: "公開日時",
        name: "nominal_date",
        type: "datetime"
      },
      {
        label: "更新日時",
        name: "updated_at",
        type: "datetime"
      },
      {
        label: "編集見出し付与日時",
        name: "title_edited_at",
        type: "datetime"
      }
    ],
    select: [
      {
        label: "CP",
        name: "provider",
        type: "select",
        option: "credit"
      }
    ],
    tag: [
      {
        label: "タグ",
        name: "tags",
        type: "select"
      }
    ],
    checkbox: [
      {
        label: "編集見出し入力済み",
        name: "is_edited_title",
        type: "checkbox"
      },
      {
        label: "直しあり",
        name: "is_fixed",
        type: "checkbox"
      },
      {
        label: "トピ掲載済み",
        name: "is_published_in_topics",
        type: "checkbox"
      },
      {
        label: "殿堂掲載済み",
        name: "is_published_in_fame",
        type: "checkbox"
      },
      {
        label: "タブ掲載済み",
        name: "is_published_in_tab",
        type: "checkbox"
      }
    ],
    sort : [
      {
        label: "入稿日時",
        name: "created_at",
        type: "sort-checkbox"
      },
      {
        label: "編集見出し更新日時",
        name: "edited_short_title",
        type: "sort-checkbox"
      },
      {
        label: "公開日時",
        name: "nominal_date",
        type: "sort-checkbox"
      },
      {
        label: "更新日時",
        name: "updated_at",
        type: "sort-checkbox"
      }
    ]
  };

  // DBアクセスする条件を生成する
  public buildSearchConditionObject = function () {
    let searchConditionObject = {};
    let conditions            = SearchConditionService.searchCondition;
    console.log("buildSearchConditionObject");
    for (let key in conditions) {
      if (conditions.hasOwnProperty(key)) {
        let condition = conditions[key];
        switch (key){
          case 'channels': case 'tags':
            if (condition.length == 0) {
              console.log("continue");
              if (searchConditionObject[key]) delete searchConditionObject[key];
              continue;
            } else {
              searchConditionObject[key] = condition;
            }
            this.compensate_parent_id(key, condition);
            continue;
          // checkboxの条件
          case 'is_edited_title':      case 'is_fixed': case 'is_published_in_topics':
          case 'is_published_in_fame': case 'is_published_in_tab':
            continue;
          // sortの条件
          case 'sort':
            searchConditionObject['order_by'] = [];
            searchConditionObject['order_by'].push({
              field : condition,
              order : 'desc'
            });
            continue;
          case 'created_at': case 'updated_at': case 'nominal_date':
          // ex) 2017年05月11日 04時49分00秒 => 2017-05-11 04:49:00　　　(2017-02-12T16:49:00.000Zはそのまま送信)
          if (typeof condition === "object") {　// datetime pickerの入力値 : Dateオブジェクト
            condition = condition.toString();
          }
          let datetime = condition.replace(/^(\d+)年(\d+)月(\d+)日\s(\d+)時(\d+)分(\d+)秒.*$/, "$1-$2-$3 $4:$5:$6");
          searchConditionObject[key] = datetime;
          continue;
          case 'edited_short_title':
            continue;
          default:
            searchConditionObject[key] = condition;
        }
      }
    }
    console.log("検索条件セット完了");
    console.log(searchConditionObject);
    return searchConditionObject;
  };

  compensate_parent_id = function (type: string, selected: any) {
    let master: any = {};
    // チャネルorタグのマスターを取得する
    if (type === 'channels') {
      console.log("チャネル");
      // console.log(this.channelConditionService);
      master = this.channelConditionService.treeViewItem;
    } else if (type === 'tags') {
      console.log("タグ");
      master = this.tagConditionService.treeViewItem;
    }

    // for (let key in master) {
    //   console.log(master[key]);
    // }

    // 親要素のIDを検索してparentsに格納する
    let parents = [];
    for (let key in selected) {
      if (selected.hasOwnProperty(key)) {

      }
    }
  };

}
