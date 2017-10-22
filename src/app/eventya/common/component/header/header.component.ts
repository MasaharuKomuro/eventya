import { Component, OnInit } from '@angular/core';
import { RegistryService } from "../../registry.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( public registryService: RegistryService ) { }

  ngOnInit() {
  }

}
