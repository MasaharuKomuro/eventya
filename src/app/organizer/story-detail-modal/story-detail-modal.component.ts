import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-story-detail-modal',
  templateUrl: './story-detail-modal.component.html',
  styleUrls: ['./story-detail-modal.component.css']
})
export class StoryDetailModalComponent implements OnInit {

  constructor() { }

  public is_open: boolean = false;
  @Input('story') public story: any;

  ngOnInit() {
  }

  public open = function () {
    this.is_open = true;
  }

}
