import { LoginService } from '../common/service/login.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StorylistComponent } from './storylist/storylist.component';
import { SiteService } from '../common/service/site.service';

@Component({
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {

  private authorizations;

  constructor(
    private loginService: LoginService,
    private siteService: SiteService
  ) {
    this.loginService.setAuthorizations();
    this.authorizations = this.loginService.authorizations;
    // オブジェクトの参照を保持したままオブジェクトを追加する
    for (const key in this.authorizations.sites) {
      if (this.authorizations.sites.hasOwnProperty(key)) {
        this.siteService.sites.push(this.authorizations.sites[key]);
      }
    }
  }

  // スクロールイベントを監視
  @ViewChild(StorylistComponent) storylistComponent: StorylistComponent;
  private onScrollStorylist= function(event): void{
    this.storylistComponent.onScrollStorylist(event);
  };

  ngOnInit() {}

}
