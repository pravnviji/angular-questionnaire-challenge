import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpRequestService } from 'src/app/core/http/http-request.service';
import { Logger } from 'src/app/core/logger.service';
import { TQuestionnaire } from '../model/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpRequestService, private logger: Logger) {}

  private questionUrl = 'api/questiondata/';

  getQuestion(): Observable<TQuestionnaire> {
    this.logger.debug('getQuestion');
    return this.http
      .get(this.questionUrl)
      .pipe(map((result) => this.mapQuestionResult(result as TQuestionnaire)));
  }

  mapQuestionResult(result: TQuestionnaire): TQuestionnaire {
    this.logger.debug('mapQuestionResult');
    this.logger.debug('result', result);
    return result;
  }
}
