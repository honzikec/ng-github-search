import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GithubSearchResult } from '../models/githubSearchResult.model';
import { GithubUser } from '../models/githubUser.model';

@Injectable({
  providedIn: 'root'
})
export class GithubSearchService {

  constructor(
    private _http: HttpClient
  ) { }

  public searchUser(query: string): Observable<GithubSearchResult<GithubUser>> {
    const params = new HttpParams().set('q', query);
    return this._http.get<GithubSearchResult<GithubUser>>('users', { params });
    // this._http.get<GithubSearchResult<GithubUser>>('users', { params }).subscribe({
    //   next: response => {
    //     this._foundUsersSubject$.next(response.items);
    //   },
    //   error: (error: any) => {
    //     console.error(error);
    //   }
    // });
  }
}
