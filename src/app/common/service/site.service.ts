import { Injectable } from '@angular/core';

@Injectable()
export class SiteService {

  public  sites = [];               // ユーザが権限を持つ全サイトのリスト
  private active_site: object = {}; // 選択されているサイト

  constructor() {}

  // 選択されているサイトをセットする
  public setActiveSite(active_site: object): void {
    this.active_site = active_site;
  }

  // 選択されているサイトを取得する
  public getActiveSite(): object {
    return this.active_site;
  }


}
