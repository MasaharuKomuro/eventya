import { Component, OnInit } from '@angular/core';
import { RegistryService } from "../common/registry.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(
      public registryService: RegistryService
  ) { }

  ngOnInit() {
  }

}
