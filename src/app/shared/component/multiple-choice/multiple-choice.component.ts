import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subscription,
} from 'rxjs';
import { TQuestions } from 'src/app/feature/model/question';
import { updatedQuestion } from 'src/app/store/actions';
import { getQuestion } from 'src/app/store/question-selector';
import { TAppState } from 'src/app/store/state';
@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss'],
})
export class MultipleChoiceComponent implements OnInit {
  @Input() question!: TQuestions[];

  QuestionData: TQuestions[] = [];
  multiplechoiceGrp: FormGroup = new FormGroup({});

  localStorage: Observable<any> = this.store.select(getQuestion);

  textFieldSubscription!: Subscription;
  localStorageSubscription!: Subscription;

  localStorageData: TQuestions[] = [];

  searchChangeObserver!: any;

  constructor(private store: Store<TAppState>) {}

  ngOnInit() {
    this.examineLocalStorage();
    this.tempelateQuestionData();
  }

  examineLocalStorage = (): void => {
    this.localStorageSubscription = this.localStorage.subscribe(
      (data: TQuestions[]) => {
        this.localStorageData = data;
      }
    );
  };

  tempelateQuestionData = (): void => {
    let count: number = 0;
    this.question.forEach((question: TQuestions) => {
      this.QuestionData.push({
        identifier: question?.identifier,
        value: this.localStorageData
          ? this.checkStorageData(question)
          : question?.value,
        count: count + 1,
        headline: question?.headline,
        question_type: question?.question_type,
        choices: question?.choices,
      });
      this.updateFormControl(question?.identifier);
      count++;
    });
  };

  updateFormControl = (id: TQuestions['identifier']): void => {
    this.multiplechoiceGrp.addControl(id, new FormControl(''));
  };

  checkStorageData = (question: TQuestions): TQuestions['value'] => {
    let newValue = '';
    this.localStorageData.filter(({ identifier, value }) => {
      if (question.identifier === identifier) {
        newValue = value;
      }
    });
    return newValue;
  };

  textFieldSubscribe = (
    fieldValue: any,
    id: TQuestions['identifier'] | undefined
  ): void => {
    if (!this.searchChangeObserver) {
      this.textFieldSubscription = new Observable((observer) => {
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

  onMultipleChoiceChange = (
    fieldValue: any,
    id: TQuestions['identifier'] | undefined
  ): void => {
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
  };
}
