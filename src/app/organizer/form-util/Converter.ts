export class Converter {

  // オブジェクトに残しておく必要のあるカラム
  private static necessary_keys =
    {
      story: [
        'id',
        'title',
        'short_title1',
        'status',
        'created_at',
        'updated_at',
        'nominal_date',
        'channels',
        'pictures',
        'providers',
        'alerts'
      ],
      tab_channel: [
        'id',
        'name',
        'path',
        'administration_name',
        'organizer_part_id'
      ],
      channel: [
        'id',
        'name',
        'path',
        'administration_name',
      ],
      provider: [
        'id',
        'name'
      ],
      part: [
        'id',
        'pv_id',
        'status',
        'disclosed_from',
        'random',
        'updated_at'
      ],
      picture: [
        'id',
        'path',
        'title',
        'caption',
        'adding_type'
      ],
      alerts: [
        'id',
        'alert_type_id',
        'status',
        'duration',
        'occurred_at',
        'updated_at'
      ]
    };

  private static assetPath = '/assets/ailab-private-sss/';

  // サムネイル画像に選定する画像の優先順位
  private static priorityOfPictures = [
    'site_big',
    'site_large',
    'site_middle',
    'site_small',
    'bodies',
    'external_big',
    'external_large',
    'external_middle',
    'external_small',
    'photo_gallery'
  ];

  // パーツ情報をパースして、編成画面用の記事一覧配列にする
  public static parsePartToEditList = function (part: object, channel_name: string, booking_list: Object): object {
    const stories: object[] = [];
    let counter: number = 1;
    part['records'].map((records) => {
      records.map((record) => {
        const story = record.resource;
        // 不要なカラムの削除
        Converter.deleteWasteColumnsOfStory(story);
        // トピ、殿堂、トップ８の順位情報を付加する
        Converter.refreshPositionAttr(story, counter, channel_name);

        // subrank = 1 なら編成リストへ
        // subrank > 1 なら予約リストへ
        if (record.subrank === 1) {
          stories.push(record.resource);
        } else {
          const rank = record.rank;
          if (!booking_list[channel_name]) {
            booking_list[channel_name] = [];
            booking_list[channel_name][rank] = [];
          } else if (!(rank in booking_list[channel_name])) {
            booking_list[channel_name][rank] = [];
          }
          booking_list[channel_name][rank].push(record.resource);
        }
      });
      counter++;
    });

    // partから不要なカラムを削除する
    Converter.deleteWasteColumns(part, 'part');
    Converter.replaceKey(part, 'part');
    return stories;
  };

  // 記事オブジェクトから不要なカラムを削除する
  public static deleteWasteColumnsOfStory(story) {
    Converter.deleteWasteColumns(story, 'story');
    // console.log(story);
    // チャネルに管理名を追加
    story.channels.map((channel) => {
      Converter.replaceKey(channel, 'channel');
    });

    if (story.channel) {
      Converter.deleteWasteColumnsOnArray(story.channels, 'channel');
    }
    if (story.provider) {
      Converter.deleteWasteColumnsOnArray(story.providers, 'provider');
    }
    if (story.pictures) {
      Converter.deleteWasteColumnsOnPicture(story.pictures);
    }
    if (story.alerts) {
      Converter.deleteWasteColumnsOnArray(story.alerts, 'alerts');
    }

    // サムネイルをセットする
    this.setThumbnailOfStory(story);
  }

  // 記事にサムネイルをセットする
  public static setThumbnailOfStory = function (story: any): void {
    if (!story.pictures) {
      story['thumbnail_path'] = '/assets/img/pict.png';
      return;
    }

    for (const i in Converter.priorityOfPictures) {
      if (Converter.priorityOfPictures.hasOwnProperty(i)) {
        for (const j in story.pictures) {
          if (story.pictures.hasOwnProperty(j)) {
            console.log(j + ' : ' + Converter.priorityOfPictures[i]);
            if (j === Converter.priorityOfPictures[i]) {
              console.log('in');
              console.log(story);
              console.log(story.pictures);
              console.log(story.pictures[j]);
              console.log(story.pictures[j][0]);
              console.log(story.pictures[j][0]['path']);
              story['thumbnail_path'] = Converter.assetPath + story.pictures[j][0]['path'];
              console.log(story);
              return;
            }
          }
        }
      }
    }
  };

  // (channel, tagなどを)ツリービューオブジェクトに整形する
  public static convertForTreeView(resource, resource_type: string) {
    resource.map(
      (resource) => {
        Converter.replaceKey(resource, resource_type);

        // childrenを持っていた場合は自分を再帰的に実行
        if (resource.children) {
          Converter.convertForTreeView(resource.children, resource_type);
        }
      }
    );
    return resource;
  }

  // タブ表示チャネルオブジェクトのキーを張り替える
  public static formChannelsShowInTab = function(channels) {
    channels.map((channel) => {
        Converter.replaceKey(channel, 'tab_channel');
    });
    console.log(channels);
    Converter.deleteWasteColumnsOnArray(channels, 'tab_channel');
    return channels;
  };

  // (story, channel, tag, providerなどから)不要なカラムを削除します
  public static deleteWasteColumns = function (resource, resource_type: string): void {
    const necessary_keys = Converter.necessary_keys[resource_type];
    let break_flag;
    for (const i in resource) {
      if (resource.hasOwnProperty(i)) {
        break_flag = false;
        for (const j in necessary_keys) {
          if (necessary_keys.hasOwnProperty(j)) {
            if (i === necessary_keys[j]) {
              break_flag = true;
              break;
            }
          }
        }
        if (!break_flag) { delete resource[i]; }
      }
    }
  };

  // (stories, channels, tags, providersなどから)不要なカラムを削除します
  public static deleteWasteColumnsOnArray = function (resource, resource_type: string): void {
    const necessary_keys = Converter.necessary_keys[resource_type];
    let break_flag;
    for (const i in resource) {
      if (resource.hasOwnProperty(i)) {
        for (const j in resource[i]) {
          if (resource[i].hasOwnProperty(j)) {
            break_flag = false;
            for (const k in necessary_keys) {
              if (necessary_keys.hasOwnProperty(k)) {
                if (j === necessary_keys[k]) {
                  break_flag = true;
                  break;
                }
              }
            }
            if (!break_flag) { delete resource[i][j] };
          }
        }
      }
    }
  };

  public static deleteWasteColumnsOnPicture = function (pictures): void {
    const necessary_keys = Converter.necessary_keys['picture'];
    console.log(pictures);
    let break_flag;
    for (const i in pictures) {
      if (pictures.hasOwnProperty(i)) {
        for (const j in pictures[i]) {
          if (pictures[i].hasOwnProperty(j)) {
            console.log(pictures[i][j]);
            for (const k in pictures[i][j]) {
              if (pictures[i][j].hasOwnProperty(k)) {
                break_flag = false;
                for (const l in necessary_keys) {
                  if (necessary_keys.hasOwnProperty(l)) {
                    if (k === necessary_keys[l]) {
                      break_flag = true;
                      break;
                    }
                  }
                }
                if (!break_flag) {
                  delete pictures[i][j][k];
                }
              }
            }
          }
        }
      }
    }
    console.log(pictures);
  };

  // 順位グループの情報（トピ・殿堂・タブ）を振り直す
  public static refreshPositionAttr = function(story, counter: number, channel_name: string) {
    if (counter <= 8) {                                                                                // トップ８
      story['position_type'] = 'top';
      return;
    }
    if (counter >= 9 && counter <= 12 && channel_name === 'topics') {                                  // 殿堂
      story['position_type'] = 'palace';
      return;
    }
    if ((counter >= 9 && channel_name !== 'topics') || (counter >= 12 && channel_name === 'topics')) { // 予備
      story['position_type'] = 'reserve';
      return;
    }
  };

  private static replaceKey = function(resource, resource_type) {
    let name;
    switch (resource_type) {
      case 'channel':
        resource['text'] = resource.name;
        resource['value'] = resource.id;
        name = resource.path.split('/');
        name = name[1];
        resource['administration_name'] = name;
        delete resource.id;
        break;
      case 'tab_channel':
        name = resource.path.split('/');
        name = name[1];
        resource['administration_name'] = name;
        break;
      case 'tag':
        resource['text'] = resource.tag_name;
        resource['value'] = resource.id;
        delete resource.tag_name;
        delete resource.id;
        break;
      case 'part':
        resource['part_id'] = resource.id;
        delete resource.id;
        break;
      default:
    }
  };

  constructor() {}

}
