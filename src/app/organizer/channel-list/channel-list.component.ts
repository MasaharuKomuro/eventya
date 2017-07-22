import { Component, OnInit } from '@angular/core';
import { EditareaComponent } from '../editarea/editarea.component';
import {BookingDataService} from '../booking-menu/booking-data.service';
import {HttpService} from '../../common/service/http.service';
import {RegistryService} from '../registry/registry.service';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent extends EditareaComponent implements OnInit {

  private headers = [];    // 編成リストのヘッダーの情報

  constructor(
    bd_service:  BookingDataService,
    httpService: HttpService,
    public registryService: RegistryService
  ) {
    super(bd_service, httpService, registryService);
    // ヘッダーの情報を受けとる
    this.headers = EditareaComponent.setHeaders();
  }

  ngOnInit() {
    this.initialize();
  }

  public zeroOrValue = function (value: string): number {
    return parseInt(0 + value, 10);
  };
}
