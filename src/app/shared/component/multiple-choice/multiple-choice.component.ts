import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss'],
})
export class MultipleChoiceComponent implements OnInit {
  @Input() question: any;
  @Input() count: any;

  constructor() {}

  ngOnInit(): void {}
}
