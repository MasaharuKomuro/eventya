import {Component, OnInit, Input} from '@angular/core';
import {HttpService} from '../../common/service/http.service';
import {SearchConditionService} from '../search-conditions/search-condition.service';

@Component({
  selector: 'app-selectbox',
  templateUrl: './selectbox.component.html',
  styleUrls: ['./selectbox.component.css']
})
export class SelectboxComponent implements OnInit {

  @Input('label') label;
  public  input;
  private option_items = [];

  constructor(private service: HttpService) {
    this.input = SearchConditionService.searchCondition;
  }

  ngOnInit() {
    this.service.doHttp('select_' + this.label.option).subscribe(
      option_items => this.option_items = option_items
    );
  }
}
