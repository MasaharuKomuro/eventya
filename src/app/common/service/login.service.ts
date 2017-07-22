import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  public authorizations;

  constructor() {}

  // local storage から、権限の情報を取得して、JSON => object に変換する
  public setAuthorizations = function(): void {
    this.authorizations = JSON.parse(localStorage.getItem('authorizations')) || {};
    console.log(this.authorizations);
  };

  // アクセストークンを取得する
  public getToken = function(): string {
    return this.authorizations.token;
  };
}
