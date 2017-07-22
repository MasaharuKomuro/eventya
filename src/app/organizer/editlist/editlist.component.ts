import {Component, OnInit, ViewChildren} from '@angular/core';
import {HttpService} from '../../common/service/http.service';
import {ChannelListComponent} from '../channel-list/channel-list.component';
import {EditareaComponent} from '../editarea/editarea.component';
import {SiteService} from '../../common/service/site.service';
import {Converter} from '../form-util/Converter';

@Component({
  selector: 'app-edit-list',
  templateUrl: './editlist.component.html',
  styleUrls: ['./editlist.component.css']
})

export class EditlistComponent implements OnInit {

  public  channels = [];                      // タブに表示する情報リスト
  public  delete_zone = [];                   // テンプレートで使用、ゴミ箱用
  private containerEl:     object;            // 編成リスト全体の要素
  private active_tab_id:   number;            // 現在選択されているチャネルのID
  public  is_loading: boolean = false;        // 更新ボタンを押した時にさい初期化中か
  public  is_initializing: boolean = true;    // 更新ボタンを押した時の読み込みか否か

  private HEADER_HEIGHT:       number = 60;   // ヘッダーの高さ      px
  private FOOTER_HEIGHT:       number = 49;   // フッターの高さ      px
  private INNER_HEADER_HEIGHT: number = 45;   // 内側のヘッダーの高さ px
  public  reloaded_counter:    number = 0;    // 更新する際に、何チャネルの更新が終わっているか

  constructor(
    private httpService: HttpService,
    private siteService: SiteService
  ) {}

  ngOnInit() {
    // タブに表示するチャネル情報リストを取得する
    // ローとパーツが読み込まれるのを待つ
    const wait_for_loading_tab_channels = setInterval(() => {
      console.log('loading tab channels ...');
      if (Object.keys(this.siteService.getActiveSite()).length > 0) {
        // ルートパーツの情報を取得する
        this.httpService.doHttp('parts', {site_id: this.siteService.getActiveSite()['id']}, 'Get').subscribe((part) => {
          console.log('ルートパーツ');
          console.log(part);
          // チャネル情報を抽出する
          const tab_channels = [];
          part.records.map((records) => {
            records.map((record) => {
              console.log(record);
              record.resource['organizer_part_id'] = record.parameters.organizer_part_id;
              tab_channels.push(record.resource);
            });
          });
          // channelsで必要なカラム以外落とす整形
          this.channels = Converter.formChannelsShowInTab(tab_channels);
          // 最初のチャネルを選択された状態にする
          this.active_tab_id = this.channels[0]['id'];
        });
        clearInterval(wait_for_loading_tab_channels);
      }
    }, 500);
    this.initPageSize();
  }

  // 編成画面の高さを、表示されている高さに固定する
  private initPageSize = function(): void {
    this.containerEl = document.getElementById('editlist_container');
    this.containerEl.style.height = window.innerHeight
      - this.HEADER_HEIGHT - this.FOOTER_HEIGHT - this.INNER_HEADER_HEIGHT + 'px';
  };

  // タブを選択した時の動作
  public selectTab = function(active_channel_id): void {
    console.log(active_channel_id);
    this.active_tab_id = active_channel_id;
  };

  // タブが選択されているかどうかを返す
  public isActiveTab = function(active_channel_id): boolean {
    return this.active_tab_id === active_channel_id;
  };

  // 更新ボタンを押した時の処理
  // 全ジャンルのリストをリロードする
  @ViewChildren(ChannelListComponent) channelListComponents: ChannelListComponent[];
  public onClickRefresh = function(): void {
    if (this.is_loading) {
      console.log('now initializing.  So rejected this operation.');
      return;
    }
    this.is_loading = true;
    console.log('refresh edit list');
    console.log(this.channels);
    console.log(this.is_initializing);

    const initializer = [];
    // チャネルリストを初期化
    this.channelListComponents.map((channelListComponent) => {
      initializer[channelListComponent.channel.administration_name] = channelListComponent.initialize();
    });

    // 更新終了を待つ
    const wait_for_initialize = setInterval(() => {
      this.reloaded_counter = 0;
      console.log('initializing edit list ...');

      // 各チャネルの初期化が終了したか判定
      for (const key in initializer) {
        if (initializer.hasOwnProperty(key)) {
          if (initializer[key]['isStopped']) { this.reloaded_counter++ };
        }
      }

      // 全チャネルの初期化が終わったところで、更新中画面終了
      if (this.reloaded_counter === this.channels.length) {
        console.log('done (initializing edit list ...)');

        // 編集中のエフェクトを解除
        EditareaComponent.unmarkEdited( true /* all */ );

        this.is_loading = false;
        clearInterval(wait_for_initialize);
      }
    }, 500);
  };

  // 子コンポーネントからローディング表示を要請された時の処理
  public startLoading = function(): void {
    this.is_loading = true;
    this.is_initializing = false;
    console.log(this.is_initializing);
  };

  // 子コンポーネントからローディング表示終了を要請された時の処理
  public doneLoading = function(): void {
    this.is_loading = false;
    this.is_initializing = true;
    console.log(this.is_initializing);
  };

}
