import {Component, OnInit} from '@angular/core';
import {ToasterService, ToasterConfig} from "angular2-toaster";

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})

export class ToasterComponent implements OnInit {

  private toasterService;
  public toasterconfig : ToasterConfig = new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  constructor(toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  public showSuccess(message: string) {
    this.toasterService.pop('success', 'Success', message);
  }

  public showError(message: string) {
    this.toasterService.pop('error', 'Error', message);
  }

  public showWarning(message: string) {
    this.toasterService.pop('warning', 'Warning', message);
  }

  public showInfo(message: string) {
    this.toasterService.pop('info', 'Info', message);
  }

  public showPrimary(message: string) {
    this.toasterService.pop('primary', 'Primary', message);
  }

  ngOnInit() {}
}
