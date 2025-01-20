import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from './user'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = "https://jsonplaceholder.typicode.com";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiURL + '/users')
      .pipe(catchError(this.errorHandler));
  }

  create(user: User): Observable<any> {
    return this.httpClient.post(this.apiURL + '/users', JSON.stringify(user), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<User> {
    return this.httpClient.get<User>(this.apiURL + '/users/' + id)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, user: User): Observable<any> {
    return this.httpClient.put(this.apiURL + '/users/' + id, JSON.stringify(user), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(this.apiURL + '/users/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
