import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TQuestionnaire, TQuestions } from 'src/app/feature/model/question';
import { getQuestion } from 'src/app/store/question-selector';

import { MultipleChoiceComponent } from './multiple-choice.component';

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

// This component is not unit-tested as per requirement Question Component and Home Component is already unit-tested
describe('MultipleChoiceComponent', () => {
  let component: MultipleChoiceComponent;
  let store: MockStore;
  let fixture: ComponentFixture<MultipleChoiceComponent>;

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
      imports: [],
      providers: [
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
      declarations: [MultipleChoiceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.question = mockQuestions;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
