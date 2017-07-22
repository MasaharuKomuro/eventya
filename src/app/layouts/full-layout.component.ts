import { HttpService } from '../common/service/http.service';
import { LoginService } from '../common/service/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SiteService } from "../common/service/site.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css']
})
export class FullLayoutComponent implements OnInit {

  public  disabled: boolean = false;
  public  status: {isopen: boolean} = {isopen: false};
  private user_name: string;        // ログインしているユーザの名前
  private sites;                    // ログインしているユーザに権限のあるサイト一覧
  private loading: boolean = false; // ログアウト処理中

  constructor(
    private loginService: LoginService,
    private siteService: SiteService,
    private httpService: HttpService,
    private router: Router
  ) {
    this.user_name = localStorage.getItem('user_name') || '不明';
    this.sites = this.siteService.sites;
  }

  public toggled = function(open: boolean): void {
    console.log(this.sites);
    console.log(this.siteService.getActiveSite());
    console.log('Dropdown is now: ', open);
  };

  public toggleDropdown = function($event: MouseEvent): void {
    console.log(this.sites);
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  };

  private logout = function(): void {
    // 処理中
    if ( this.loading ) return;
    this.loading = true;
    this.httpService.doHttp('logout', {'access_token': this.loginService.getToken()}, "Get")
      .finally( () => {
        this.loading = false;
      })
      .subscribe(
        (res) => {
          console.log('logout');
          localStorage.removeItem('user_name');
          localStorage.removeItem('authorizations');
          this.router.navigate(['/login']);
        },
        (erorr) => {
          console.log('error');
        }
      );
  };

  // サイトが変更された時の処理
  // select_site 変更後のサイト
  private changeSite = function (selected_site: object): void {
    console.log("site selected : ");
    console.log(selected_site);
    this.siteService.setActiveSite(selected_site);
  };

  ngOnInit(): void {}
}
