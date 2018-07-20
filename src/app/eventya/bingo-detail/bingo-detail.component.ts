import { Component, OnInit } from '@angular/core';
import { RegistryService } from "../common/registry.service";

@Component({
  selector: 'app-bingo-detail',
  templateUrl: './bingo-detail.component.html',
  styleUrls: ['./bingo-detail.component.css']
})
export class BingoDetailComponent implements OnInit {

  constructor(
      public registryService: RegistryService
  ) { }

  ngOnInit() {
  }

}
