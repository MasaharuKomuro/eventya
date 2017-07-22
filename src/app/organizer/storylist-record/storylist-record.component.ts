import {Component, OnInit, Input} from '@angular/core';
import {Converter} from '../form-util/Converter';
import {RegistryService} from "../registry/registry.service";

@Component({
  selector: '[app-storylist-record]',
  templateUrl: 'storylist-record.component.html',
  styleUrls: ['storylist-record.component.css']
})

export class StorylistRecordComponent implements OnInit {

  @Input('story') story;
  @Input('index') index;

  constructor(public registryService: RegistryService) {}

  ngOnChanges() {
    Converter.deleteWasteColumnsOfStory(this.story);
  };

  ngOnInit() {
  }

  list = [
    {
      id: 1,
      label: 'one'
    },
    {
      id: 2,
      label: 'two'
    },
    {
      id: 3,
      label: 'three'
    },
    {
      id: 4,
      label: 'four'
    },
  ];

  public get_picture = function () {
    return '';
  };

  public zeroOrValue = function (value: string): number {
    return parseInt(0 + value, 10);
  };
}
