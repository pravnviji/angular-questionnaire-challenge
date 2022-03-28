import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
import { TQuestions } from 'src/app/feature/model/question';
import { loadQuestion, updatedQuestion } from 'src/app/store/actions';
import { TAppState } from 'src/app/store/state';
@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss'],
})
export class MultipleChoiceComponent implements OnInit {
  @Input() question!: TQuestions[];

  QuestionData: TQuestions[] = [];
  multiplechoiceGrp: FormGroup = new FormGroup({});

  textFieldSearch: Subject<string> = new Subject<string>();
  private textFieldSearchSubscription!: Subscription;

  searchChangeObserver!: any;

  constructor(private store: Store<TAppState>) {}

  ngOnInit(): void {
    let count: number = 0;
    this.loadFromLocalData();
    this.question.forEach((question: TQuestions) => {
      this.QuestionData.push({
        identifier: question?.identifier,
        value: question?.value,
        count: count + 1,
        headline: question?.headline,
        question_type: question?.question_type,
        choices: question?.choices,
      });
      this.multiplechoiceGrp.addControl(
        question?.identifier,
        new FormControl('')
      );
      count++;
    });
  }

  textFieldSubscribe = (
    fieldValue: any,
    id: TQuestions['identifier'] | undefined
  ) => {
    if (!this.searchChangeObserver) {
      new Observable((observer) => {
        this.searchChangeObserver = observer;
      })
        .pipe(debounceTime(1000))
        .pipe(distinctUntilChanged())
        .subscribe((data: any) => {
          this.onMultipleChoiceChange(data?.target.value, id);
        });
    }
    this.searchChangeObserver.next(fieldValue);
  };

  loadFromLocalData() {
    /*this.question =
      localStorage.getItem('questionData') !== null
        ? (JSON.parse(
            localStorage.getItem('questionData') as string
          ) as TQuestions[])
        : this.question;*/
    // this.store.dispatch(loadQuestion());
  }

  onMultipleChoiceChange(
    fieldValue: any,
    id: TQuestions['identifier'] | undefined
  ) {
    let fieldData = fieldValue?.target ? fieldValue.target?.value : fieldValue;
    if (id) {
      this.multiplechoiceGrp.controls[id].setValue({ value: fieldData });
      this.QuestionData.forEach((element: any) => {
        if (id === element.identifier) {
          this.store.dispatch(
            updatedQuestion({
              identifier: id,
              questions: { ...element, value: fieldData },
            })
          );
        }
      });
    }
  }
}
