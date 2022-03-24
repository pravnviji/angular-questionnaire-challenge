import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  question$: Observable<any> = this.questionService.getQuestion();

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {}
}
