import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
import { TQuestions } from 'src/app/feature/model/question';
import { updatedQuestion } from 'src/app/store/actions';
import { getQuestion } from 'src/app/store/question-selector';
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
  localStorage: Observable<any> = this.store.select(getQuestion);
  localStorageData: TQuestions[] = [];

  searchChangeObserver!: any;

  constructor(private store: Store<TAppState>) {}

  ngOnInit(): void {
    this.checkLocalStorage();
    this.formatQuestionData();
  }

  checkLocalStorage = () => {
    this.localStorage.subscribe((data: TQuestions[]) => {
      this.localStorageData = data;
    });
  };

  formatQuestionData = () => {
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

  updateFormControl = (id: TQuestions['identifier']) => {
    this.multiplechoiceGrp.addControl(id, new FormControl(''));
  };

  checkStorageData = (question: TQuestions) => {
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
