import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GithubSearchResult } from '../models/githubSearchResult.model';
import { GithubUser } from '../models/githubUser.model';

@Injectable({
  providedIn: 'root'
})
export class GithubSearchService {

  private _foundUsersSubject$ = new Subject<GithubUser[]>();

  public foundUsers$ = this._foundUsersSubject$.asObservable();

  constructor(
    private _http: HttpClient
  ) { }

  public searchUser(query: string): void {
    const params = new HttpParams().set('q', query);
    this._http.get<GithubSearchResult<GithubUser>>('users', { params }).subscribe({
      next: response => {
        this._foundUsersSubject$.next(response.items);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
}
