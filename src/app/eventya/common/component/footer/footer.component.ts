import { Component, OnInit } from '@angular/core';
import { RegistryService } from "../../registry.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
      public registryService: RegistryService
  ) { }

  ngOnInit() {
  }

}
