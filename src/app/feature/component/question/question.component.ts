import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { MultipleChoiceComponent } from 'src/app/shared/component/multiple-choice/multiple-choice.component';
import { getAllQuestion } from 'src/app/store/actions';
import { getQuestion } from 'src/app/store/question-selector';
import { TAppState } from 'src/app/store/state';
import { TQuestions } from '../../model/question';
import { QuestionService } from '../../services/question.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent {
  question$: Observable<any> = this.questionService.getQuestion();
  localQuestionStorage: Observable<any> = this.store.select(getQuestion);

  @ViewChild(MultipleChoiceComponent) mutipleChoice!: MultipleChoiceComponent;
  @ViewChild('formSubmitDialog') formSubmitDialog!: TemplateRef<any>;

  formDialogRef!: MatDialogRef<typeof QuestionComponent>;

  localQuestionStorageSub!: Subscription;

  constructor(
    private store: Store<TAppState>,
    private questionService: QuestionService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  onSubmit = (): void => {
    this.localStorageOrchestrate();
    this.openFormDialog();
  };

  localStorageOrchestrate = (): void => {
    localStorage.getItem('questionData') ? localStorage.clear() : null;
    this.store.dispatch(getAllQuestion());
    this.localQuestionStorageSub = this.localQuestionStorage.subscribe(
      (data: TQuestions[]) => {
        localStorage.setItem('questionData', JSON.stringify(data));
      }
    );
  };

  openFormDialog = (): void => {
    this.formDialogRef = this.dialog.open(this.formSubmitDialog);

    this.formDialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'Home') {
        this.navigateToHome();
      }
    });
  };

  navigateToHome = () => {
    this.router.navigate(['/']);
  };
}
