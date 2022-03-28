import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, getTestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Logger } from 'src/app/core/logger.service';
import { TQuestionnaire } from '../model/question';
import { QuestionService } from './question.service';

class MockLoggerService {
  log() {
    return of(true);
  }
  debug() {
    return of(true);
  }
}

describe('QuestionService', () => {
  let serviceTest: QuestionService;
  let httpMock: HttpTestingController;
  let injector: TestBed;
  const dummyTarifDetails: TQuestionnaire = {
    id: 40,
    identifier: 'ewBzTS',
    name: 'Privathaftpflichtversicherung',
    questions: [
      {
        question_type: 'multiple-choice',
        identifier: 'list_12110962',
        headline: 'Wen möchtest Du versichern?',
        required: false,
        choices: [
          {
            label: 'Meine Familie mit Kindern',
            value: 'Meine Familie mit Kindern',
            selected: false,
          },
        ],
      },
    ],
    description: 'test',
    category_name_hyphenated: 'test',
  };

  const environmentUrl = 'http://localhost:3000/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: httpMock, useClass: HttpTestingController },
        { provide: Logger, useClass: MockLoggerService },
      ],
    });
    injector = getTestBed();
    httpMock = TestBed.get(HttpTestingController);
    serviceTest = injector.get(QuestionService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(serviceTest).toBeTruthy();
  });

  it('getQuestion() should check valid URL and mapQuestionResult should called', () => {
    spyOn(serviceTest, 'mapQuestionResult').and.callThrough();
    serviceTest
      .getQuestion()
      .subscribe((res) =>
        expect(serviceTest.mapQuestionResult).toHaveBeenCalledWith(res)
      );
    const reqMock = httpMock.expectOne(
      (req) =>
        req.method === 'GET' && req.url === environmentUrl + 'api/questiondata/'
    );
    expect(reqMock.request.method).toBe('GET');
  });

  it('mapQuestionResult() should return valid TQuestionnaire Resultset', () => {
    const result = serviceTest.mapQuestionResult(dummyTarifDetails);
    expect(result).toEqual(dummyTarifDetails);
  });
});
