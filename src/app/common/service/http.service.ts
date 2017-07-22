import { Injectable } from "@angular/core";
import {Http, Request, URLSearchParams, RequestOptionsArgs, RequestOptions, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

@Injectable()
export class HttpService {

  private api = {
    login         : './cms/api/v1/login',              // ログインAPI
    logout        : './cms/api/v1/logout',             // ログアウトAPI
    story         : './cms/api/v1/stories',
    post_alerts   : './cms/api/v1/stories/alerts',
    channel_name  : './cms/santaroAPI/getTabChannels',
    select_credit : './cms/santaroAPI/getCredits',
    tags          : './cms/api/v1/tags',               // タグマスタ取得API
    channels      : './cms/api/v1/channels',           // チャネルマスタ取得API
    parts         : './cms/api/v1/parts'
  };
  public site_id = 90000000;

  constructor(private http: Http) {}

  // http通信を実行する関数群をまとめたもの
  public doHttp(type: string, params = {}, method = 'Get', style = 'default', param_in_path = ''): Observable<any> {
    const options: RequestOptions = this.makeRequestConfig(type, params, method, style, param_in_path);
    return this.fetch(options);
  }

  // リクエスト用途の設定（パラメータなど）を行う
  private makeRequestConfig(type: string, params = {}, method: string, style = 'default', param_in_path = ''): RequestOptions {
    const param = new URLSearchParams();
    if (params !== {}) {
      if ( style === 'default') {
        for (const key in params) {
          if (params.hasOwnProperty(key)) {
            if (key === 'site_id' && params[key] === '') {
              param.set(key, this.site_id.toString());
              continue;
            }
            param.set(key, params[key]);
          }
        }
      } else if (style === 'json') {
        for (const key in params) {
          if (params.hasOwnProperty(key)) {
            param.set( key, JSON.stringify(params[key]));
          }
        }
      }
    }

    // ヘッダーを設定
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    // 通信設定オブジェクト作成
    if (param_in_path !== '') {
      param_in_path = '/' + param_in_path;
    }
    const options: RequestOptionsArgs = {
      method: method,
      url: this.api[type] + param_in_path + '.json',
      headers: headers
    };

    if (method === 'Get') {
      options.search = param;
    } else if (method === 'Post') {
      options.body = param.toString();
    }

    return new RequestOptions(options);
  }

  // httpリクエストを実行する
  private fetch(options: RequestOptions): Observable<any> {
    return this.http.request(new Request(options)).map( res => res.json() );
  }

}
