import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FeatureModule } from '../../feature.module';

import { QuestionComponent } from './question.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TQuestionnaire, TQuestions } from '../../model/question';
import { of } from 'rxjs';
import { QuestionService } from '../../services/question.service';
import { getQuestion } from 'src/app/store/question-selector';
import { MatDialog } from '@angular/material/dialog';

export class MdDialogMock {
  open() {
    return {
      afterClosed: () => of('Home'),
    };
  }
}

function storageMock() {
  let storage: any = {};

  return {
    setItem: function (key: any, value: any) {
      storage[key] = value || '';
    },
    getItem: function (key: string) {
      return key in storage ? storage[key] : null;
    },
    removeItem: function (key: string) {
      delete storage[key];
    },
    clear: function () {
      storage = {};
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: function (i: number) {
      const keys = Object.keys(storage);
      return keys[i] || null;
    },
  };
}
let mockQuestions: TQuestions[] = [
  {
    question_type: 'text',
    identifier: 'textarea_12110979',
    headline: 'Hast Du noch weitere Informationen oder Anmerkungen für uns?',
    description: null,
    required: false,
    multiline: 'true',
    jumps: [],
  },
];
let mockData: TQuestionnaire = {
  id: 40,
  identifier: 'ewBzTS',
  name: 'Privathaftpflichtversicherung',
  questions: [
    {
      question_type: 'text',
      identifier: 'textarea_12110979',
      headline: 'Hast Du noch weitere Informationen oder Anmerkungen für uns?',
      description: null,
      required: false,
      multiline: 'true',
      jumps: [],
    },
  ],
  description: '',
  category_name_hyphenated: '',
};
class QuestionServiceStub {
  questionResult: TQuestionnaire = mockData;
  getQuestion() {
    return of(this.questionResult);
  }
}
describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let router: Router;
  let store: MockStore;
  let fixture: ComponentFixture<QuestionComponent>;
  let localStorage: any;

  const initialState: TQuestionnaire = {
    questions: [],
    id: 0,
    identifier: '',
    name: '',
    description: '',
    category_name_hyphenated: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: MatDialog, useClass: MdDialogMock },
        { provide: QuestionService, useClass: QuestionServiceStub },
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: getQuestion,
              value: mockQuestions,
            },
          ],
        }),
      ],
      declarations: [QuestionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: storageMock(),
    });
    fixture = TestBed.createComponent(QuestionComponent);
    router = TestBed.get(Router);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSubmit on trigger should call localStorageOrchestrate & openFormDialog functions', () => {
    const localStorageOrchestrateSpy = spyOn(
      component,
      'localStorageOrchestrate'
    );
    const openFormDialogSpy = spyOn(component, 'openFormDialog');

    component.onSubmit();

    expect(localStorageOrchestrateSpy).toHaveBeenCalled();
    expect(openFormDialogSpy).toHaveBeenCalled();
  });

  it('localStorageOrchestrate should check localstorage if has questionData then clear it', () => {
    window.localStorage.setItem('questionData', mockQuestions as any);
    const initialRes = window.localStorage.getItem('questionData');

    const clearSpyOn = spyOn(window.localStorage, 'clear');

    component.localStorageOrchestrate();

    expect(initialRes).toEqual(mockQuestions as any);
    expect(clearSpyOn).toHaveBeenCalled();
  });

  it('localStorageOrchestrate should set questionData into localstorage', () => {
    window.localStorage.getItem('questionData');

    component.localStorageOrchestrate();
    store.select(getQuestion).subscribe((data) => {
      console.log('getQuestion');
      console.log(data);
      expect(data).not.toBeNull;
    });
  });

  it('openFormDialog should initialised the opneFormDialog', () => {
    component.openFormDialog();

    expect(component.formDialogRef).toBeDefined();
  });

  it('openFormDialog should navigate to Home', () => {
    const navigateHomeSpy = spyOn(component, 'navigateToHome');

    component.openFormDialog();

    expect(navigateHomeSpy).toHaveBeenCalled();
  });
});
