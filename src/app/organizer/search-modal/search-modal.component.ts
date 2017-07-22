import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { SearchConditionService } from '../search-conditions/search-condition.service';
import { ChannelConditionService } from '../conditions/channel-condition.service';
import { TagConditionService } from '../conditions/tag-condition.service';

@Component({
  selector: 'app-search-modal',
  templateUrl: 'search-modal.component.html',
  styleUrls: ['search-modal.component.css']
})
export class SearchModalComponent implements OnInit {

  public labels = {};
  public input;

  @Output() clickSearchButton = new EventEmitter();

  constructor(
    private sc_service: SearchConditionService,
    private channelConditionService: ChannelConditionService,
    private tagConditionService: TagConditionService
  ) {
    // ラベル情報を取得
    this.labels = SearchConditionService.setLabels();
    // ユーザの入力内容を取得
    this.input = SearchConditionService.searchCondition;
  }

  ngOnInit() {}

  // 検索ボタンを押した時の動作
  public runSearch = function (): void {
    // 検索条件に表示するジャンル情報をセットする
    this.channelConditionService.refreshChannelCondition();
    // 検索条件に表示するジャンル情報をセットする
    this.tagConditionService.refreshTagCondition();
    // 検索条件をローカルストレージに保存
    SearchConditionService.saveSearchCondition();
    console.log(this.input);
    console.log(SearchConditionService.searchCondition);
    this.clickSearchButton.emit();
  };

  // リセットボタンを押した時の動作
  public clear = function (): void {
    this.sc_service.clear();
  };

  // キャンセルボタンを押した時の動作
  private cancel = function (): void {
    const initial_condition = this.sc_service.cancel();
    // オブジェクトの参照を維持したまま、値を元に戻す
    for (const key in this.input) {
      if (this.input.hasOwnProperty(key)) {
        if (typeof this.input[key] !== 'object') { // プリミティブ型の場合
          if (initial_condition[key] == null || typeof initial_condition[key] === 'undefined') { // もともと指定されていなかった条件の時
            delete this.input[key];
          } else { // もともと違う条件が指定されていた場合
            this.input[key] = initial_condition[key];
          }
        } else { // オブジェクトの場合
          // 配列をからにする
          for (const key2 in this.input[key]) {
            if (this.input[key].hasOwnProperty(key2)) {
              delete this.input[key][key2];
            }
          }
          if (initial_condition[key] == null || typeof initial_condition[key] === 'undefined') { // もともと指定されていなかった条件の時
          } else {
            for (const key2 in initial_condition[key]) {
              if (initial_condition[key].hasOwnProperty(key2)) {
                this.input[key].push(initial_condition[key][key2]);
              }
            }
          }
        }
      }
    }
    console.log('click cancel');
  };

  // ジャンル選択ツリービューの内容を更新する（モーダルを開くごとに更新）
  public refreshChannelCondition = function (): void {
    this.channelConditionService.refreshChannelCondition();
    this.tagConditionService.refreshTagCondition();
  };
}
