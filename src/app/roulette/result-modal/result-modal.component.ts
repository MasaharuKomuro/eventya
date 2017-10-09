import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-result-modal',
  templateUrl: './result-modal.component.html',
  styleUrls: ['./result-modal.component.css']
})

export class ResultModalComponent implements OnInit {

  constructor() { }

  @Input('alreadies') alreadies;

  ngOnInit() {
  }

}
