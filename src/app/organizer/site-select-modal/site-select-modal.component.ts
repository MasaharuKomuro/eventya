import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SiteService } from '../../common/service/site.service';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-site-select-modal',
  templateUrl: './site-select-modal.component.html',
  styleUrls: ['./site-select-modal.component.css']
})
export class SiteSelectModalComponent implements OnInit, AfterViewInit {

  public sites: object;

  @ViewChild('siteSelectModal') private siteSelectModal: ModalDirective;

  constructor(
    public siteService: SiteService
  ) {
    this.sites = this.siteService.sites;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    // サイト選択モーダルを開く
    this.siteSelectModal.show();
  }

  public siteSelected = function(selected_site): void {
    console.log('site selected');
    console.log(selected_site);
    this.siteService.setActiveSite(selected_site);
    this.siteSelectModal.hide();
  };
}
