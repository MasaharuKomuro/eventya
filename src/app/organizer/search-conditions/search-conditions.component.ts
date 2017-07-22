import { Component, OnInit } from '@angular/core';
import {SearchConditionService} from "./search-condition.service";
import {ChannelConditionService} from "../conditions/channel-condition.service";
import {TagConditionService} from "../conditions/tag-condition.service";

@Component({
  selector:  'app-search-conditions',
  templateUrl: './search-conditions.component.html',
  styleUrls: ['search-conditions.component.css']
})
export class SearchConditionsComponent implements OnInit {

  private labels;   // 表示するカラムの情報
  public  inputs;   // 入力データの配列
  private channels; // 選択されている中ジャンルの配列
  private tags;     // 選択されている、第２階層以下のタグの配列

  constructor(
    private channelConditionService: ChannelConditionService,
    private tagConditionService:     TagConditionService
  ) {
    this.labels   = SearchConditionService.setLabels();
    this.inputs   = SearchConditionService.searchCondition;
    console.log(this.inputs);
    this.channels = channelConditionService.disp_channels;
    this.tags     = tagConditionService.disp_tags;
  }

  // sortのnameからlabelを取得する( ex) updated_at => 更新日時  )
  private getSortLabel = function(): string {
    let sort_label: string = '';
    for (const key in SearchConditionService.labels.sort) {
      if (SearchConditionService.labels.sort.hasOwnProperty(key)) {
        if (SearchConditionService.labels.sort[key]['name'] === this.inputs['sort']) {
          sort_label = SearchConditionService.labels.sort[key]['label'];
          break;
        }
      }
    }
    return sort_label;
  };

  ngOnInit() {
  }

}
