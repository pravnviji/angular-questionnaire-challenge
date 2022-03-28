import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MultipleChoiceComponent } from 'src/app/shared/component/multiple-choice/multiple-choice.component';
import { getAllQuestion } from 'src/app/store/actions';
import { getQuestion } from 'src/app/store/question-selector';
import { TAppState } from 'src/app/store/state';
import { TQuestions } from '../../model/question';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  question$: Observable<any> = this.questionService.getQuestion();
  localStorage: Observable<any> = this.store.select(getQuestion);
  @ViewChild(MultipleChoiceComponent) mutipleChoice!: MultipleChoiceComponent;

  constructor(
    private store: Store<TAppState>,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    localStorage.getItem('questionData')
      ? localStorage.removeItem('questionData')
      : '';
    this.store.dispatch(getAllQuestion());
    this.localStorage.subscribe((data: TQuestions[]) => {
      localStorage.setItem('questionData', JSON.stringify(data));
    });
  }
}
