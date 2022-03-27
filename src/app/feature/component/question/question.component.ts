import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MultipleChoiceComponent } from 'src/app/shared/component/multiple-choice/multiple-choice.component';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  question$: Observable<any> = this.questionService.getQuestion();
  @ViewChild(MultipleChoiceComponent) mutipleChoice!: MultipleChoiceComponent;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    debugger;
  }
}
