import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Logger } from '../../core/logger.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  private header: HttpHeaders = new HttpHeaders({ responseType: 'JSON' });

  constructor(private http: HttpClient, private logger: Logger) {
    this.logger.debug(`HttpRequestService`, environment.serverUrl);
  }

  /**
   * Gets http request service
   * @param url 
   * @param [header] 
   * @returns get 
   */
  public get(path: string, header?: object): Observable<Object> {
    this.logger.debug(`HttpRequestService`, `get`);
    this.logger.debug(`HttpRequestService`, environment.serverUrl + path);
    header = header ?? this.header;
    const url = environment.serverUrl + path;
    return this.http.get(url, header).pipe(
      retry(3), catchError((err) => this.handleError(err, `GET`, url)));
  }

  handleError(error: any, method: string, url: string) {
    this.logger.debug(`:: Exception in ${method} ==> ${url}`, `Error =>`, error);
    return throwError(() => error);
  }

  /**
   * Posts http request service
   * @param url 
   * @param body 
   * @param [header] 
   * @returns post 
   */
  public post(path: string, body: object, header?: object): Observable<Object> {
    this.logger.debug(`HttpRequestService`, `post`);
    this.logger.debug(`HttpRequestService`, body);
    this.logger.debug(`HttpRequestService`, environment.serverUrl + path);
    header = header ?? this.header;
    const url = environment.serverUrl + path;
    return this.http.post(url, body, header).pipe(
      retry(3), catchError((err) => this.handleError(err, `POST`, url)));
  }

  /**
   * Puts http request service
   * @param url 
   * @param [body] 
   * @param [header] 
   * @returns put 
   */
  public put(path: string, body?: object, header?: object): Observable<Object> {
    header = header ?? this.header;
    const url = environment.serverUrl + path;
    return this.http.put(url, body, header).pipe(
      retry(3), catchError((err) => this.handleError(err, `PUT`, url)));
  }

  /**
   * Deletes http request service
   * @param url 
   * @param [header] 
   * @param [requestBody] 
   * @returns delete 
   */
  public delete(path: string, header?: object, requestBody?: object): Observable<Object> {
    const options = {
      headers: header === undefined ? this.header : new HttpHeaders(header as { [key: string]: string | string[] }),
      body: requestBody,
    };
    const url = environment.serverUrl + path;
    return this.http.request('delete', url, options).pipe(
      retry(3), catchError((err) => this.handleError(err, `DELETE`, url)));
  }
}
