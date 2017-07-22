import {Injectable} from '@angular/core';

@Injectable()
export class BookingDataService {

  public bookingList = [];

  constructor() {}

  // 各行に保存する予約リストを返す
  public getBookingStoriesToShow(channel_name: string, index: number) {
    if (this.bookingList[channel_name]) {
      if (this.bookingList[channel_name][index]) {
        return this.bookingList[channel_name][index];
      }
    } else {
      return [];
    }
  }

  // 予約リスト確認ボタンを行に表示するか否かを返す
  public showBookingListButton(channel_name: string, index: number): boolean {
    if (this.bookingList[channel_name]) {
      if (this.bookingList[channel_name][index]) {
        if (this.bookingList[channel_name][index][0] != null) {
          return true;
        }
      }
      return false;
    }
    return false;
  }

  // １つ上に予約する
  public bookingUpper(story_obj) {
    const data = story_obj.dataContext;
    const story = data.story;
    const index = data.index - 1;
    const channel_name = data.channel_name;
    if (index < 0) { // １番上の記事の場合、予約ができない
      return false;
    }

    if (!this.bookingList[channel_name]) {
      this.bookingList[channel_name] = [];
      this.bookingList[channel_name][index] = [];
    } else if (!(index in this.bookingList[channel_name])) {
      this.bookingList[channel_name][index] = [];
    }

    // 記事を重複して予約することはできない
    for (const i in this.bookingList[channel_name][index]) {
      if (this.bookingList[channel_name][index].hasOwnProperty(i)) {
        if (this.bookingList[channel_name][index][i]['id'] === story.id) {
          return false;
        }
      }
    }

    this.bookingList[channel_name][index].push(story);
    // 公開日時でソート
    this.object_array_sort(this.bookingList[channel_name][index], 'nominal_date', 'asc');
    return true;
  };

  // １つ下に予約する
  public bookingLower(story_obj: any): boolean {
    const data = story_obj.dataContext;
    const story = data.story;
    const index = data.index + 1;
    const channel_name = data.channel_name;

    if (index > 7) { // 8番上の記事の場合、予約ができない
      return false;
    }

    if (!this.bookingList[channel_name]) {
      this.bookingList[channel_name] = [];
      this.bookingList[channel_name][index] = [];
    } else if (!(index in this.bookingList[channel_name])) {
      this.bookingList[channel_name][index] = [];
    }

    // 記事を重複して予約することはできない
    for (const i in this.bookingList[channel_name][index]) {
      if (this.bookingList[channel_name][index].hasOwnProperty(i)) {
        if (this.bookingList[channel_name][index][i]['id'] === story.id) {
          return false;
        }
      }
    }

    this.bookingList[channel_name][index].push(story);
    // 公開日時でソート
    this.object_array_sort(this.bookingList[channel_name][index], 'nominal_date', 'asc');
    return true;
  }

  public object_array_sort = function (data, key, order = 'desc', fn = (data) => {}) {
    // デフォは降順(DESC)
    let num_a = -1;
    let num_b = 1;

    if (order === 'asc') { // 指定があれば昇順(ASC)
      num_a = 1;
      num_b = -1;
    }

    data = data.sort(function (a, b) {
      const x = a[key];
      const y = b[key];
      if (x > y) { return num_a }
      if (x < y) { return num_b }
      return 0;
    });

    fn(data); // ソート後の配列を返す
  };

  // 予約を解除する
  public clear(story, channel_name: string, index: number): boolean {
    if (this.bookingList[channel_name]) {
      if (this.bookingList[channel_name][index]) {
        for (const i in this.bookingList[channel_name][index]) {
          if (this.bookingList[channel_name][index].hasOwnProperty(i)) {
            if (this.bookingList[channel_name][index][i] === story) {
              this.bookingList[channel_name][index].splice(i, 1);
              return true;
            }
          }
        }
      }
    }
    return false;
  }

}
