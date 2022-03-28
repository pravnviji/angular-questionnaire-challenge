import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MultipleChoiceComponent } from 'src/app/shared/component/multiple-choice/multiple-choice.component';
import { getAllQuestion } from 'src/app/store/actions';
import { getQuestion } from 'src/app/store/question-selector';
import { TAppState } from 'src/app/store/state';
import { TQuestions } from '../../model/question';
import { QuestionService } from '../../services/question.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  question$: Observable<any> = this.questionService.getQuestion();
  localStorage: Observable<any> = this.store.select(getQuestion);
  @ViewChild(MultipleChoiceComponent) mutipleChoice!: MultipleChoiceComponent;
  @ViewChild('formSubmitDialog') formSubmitDialog!: TemplateRef<any>;

  constructor(
    private store: Store<TAppState>,
    private questionService: QuestionService,
    private dialog: MatDialog,
    private router: Router
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
    this.openFormDialog();
  }

  openFormDialog() {
    let dialogRef = this.dialog.open(this.formSubmitDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'Home') {
        console.log('Home');
        this.router.navigate(['/']);
      }
    });
  }
}
