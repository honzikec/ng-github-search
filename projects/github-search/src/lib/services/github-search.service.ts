import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GithubUserSearchExactMatchField, GithubUserSearchParams } from '../models';
import { GithubSearchResult } from '../models/githubSearchResult.model';
import { GithubUser } from '../models/githubUser.model';
import { GithubSearchUtils } from '../utils/github-search.utils';

@Injectable({
  providedIn: 'root'
})
export class GithubSearchService {

  constructor(
    private _http: HttpClient
  ) { }

  public searchUser(query: string, searchParams?: GithubUserSearchParams): Observable<GithubSearchResult<GithubUser>> {
    let params = new HttpParams();

    const q = this.constructQuery(query, searchParams);
    params = params.append('q', q);

    if (searchParams?.accountType) {
      params = params.append('type', searchParams.accountType);
    }

    console.log(params);

    // return new Observable(); // TODO: remove, tmp
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

  private constructQuery(query: string, searchParams?: GithubUserSearchParams): string {

    let q = query;

    if (!searchParams) {
      return q;
    }

    if (searchParams.exactMatch) {
      q = `${searchParams.exactMatch}:${query}`;
    }


    if (searchParams.containedIn) {
      if (Array.isArray(searchParams.containedIn)) {
        searchParams.containedIn.forEach(field => {
          q += `+in:${field}`;
        });
      } else {
        q += `+in:${searchParams.containedIn}`;
      }
    }

    if (searchParams.repos) {
      if (typeof searchParams.repos === 'number') {
        q += `+repos:${searchParams.repos}`;
      } else if ('value' in searchParams.repos) {
        q += `+repos:${searchParams.repos.qualifier || ''}${searchParams.repos.value}`;
      } else {
        q += `+repos:${searchParams.repos.from}..${searchParams.repos.to}`;
      }
    }

    if (searchParams.location) {
      q += `+location:${searchParams.location}`;
    }

    if (searchParams.language) {
      q += `+language:${searchParams.language}`;
    }

    if (searchParams.created) {
      if (typeof searchParams.created === 'string') {
        q += `+created:${searchParams.created}`;
      } else if (searchParams.created instanceof Date) {
        q += `+created:${GithubSearchUtils.formatDate(searchParams.created)}`;
      } else if ('value' in searchParams.created) {
        const value = searchParams.created.value instanceof Date ? GithubSearchUtils.formatDate(searchParams.created.value) : searchParams.created.value;
        q += `+created:${searchParams.created.qualifier || ''}${value}`;
      } else {
        const valueFrom = searchParams.created.from instanceof Date ? GithubSearchUtils.formatDate(searchParams.created.from) : searchParams.created.from;
        const valueTo = searchParams.created.to instanceof Date ? GithubSearchUtils.formatDate(searchParams.created.to) : searchParams.created.to;
        q += `+created:${valueFrom}..${valueTo}`;
      }
    }


    if (searchParams.followers) {
      if (typeof searchParams.followers === 'number') {
        q += `+followers:${searchParams.followers}`;
      } else if ('value' in searchParams.followers) {
        q += `+followers:${searchParams.followers.qualifier || ''}${searchParams.followers.value}`;
      } else {
        q += `+followers:${searchParams.followers.from}..${searchParams.followers.to}`;
      }
    }

    if (searchParams.sponsorable !== undefined) {
      q += `+sponsorable:${searchParams.sponsorable}`;
    }

    return q;
  }
}
