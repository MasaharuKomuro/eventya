import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../common/service/http.service";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user_name:     string;
  private password:      string;
  private error_message: string;          // ログイン認証に失敗した際に表示する文字列
  private isLoading:     boolean = false; // ロード中の表示制御

  constructor(
    private router: Router,
    private httpService: HttpService
  ) {}

  // ログイン認証を行う
  // 認証に成功した場合は、トークンと各種権限をローカルストレージの保存後
  // トップページにルーティングする
  private authentication = function(): void{

    if (this.isLoading) return; // ロード中に連続してボタンを押すことはできない
    this.isLoading = true; // ロード中

    console.log( 'user_id : ' + this.user_name);
    console.log( 'password : ' + this.password);
    this.httpService.doHttp('login', {'user_name': this.user_name, 'password': this.password}, 'Post').finally(() => {
        // ロード終了
      console.log("");
        this.isLoading = false;
   })
      .subscribe(
        (data) => {
          console.log(data);
          localStorage.setItem('authorizations', JSON.stringify(data));
          localStorage.setItem('user_name', this.user_name);
          this.router.navigate(['/organizer']);
        },
        (error) => {
          if (error.status === 401) {
            // 認証に失敗した時
            this.error_message = JSON.parse(error._body);
          }
        }
    );
  };

  ngOnInit() {
  }

}
