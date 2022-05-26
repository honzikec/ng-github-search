import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GithubUserSearchParams } from '../models';
import { GithubSearchParams } from '../models/githubSearchParams.model';
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

  public searchUser(query: string, searchParams?: { advancedSearchParams?: GithubUserSearchParams, globalSearchParams?: GithubSearchParams }): Observable<GithubSearchResult<GithubUser>> {
    let params = new HttpParams();

    const q = this.constructQuery(query, searchParams);
    params = params.append('q', q);

    if (searchParams?.globalSearchParams?.page) {
      params = params.append('page', searchParams?.globalSearchParams.page);
    }

    if (searchParams?.globalSearchParams?.per_page) {
      params = params.append('per_page', searchParams?.globalSearchParams.per_page);
    }

    return this._http.get<GithubSearchResult<GithubUser>>('users', { params });
  }

  private constructQuery(query: string, searchParams?: { advancedSearchParams?: GithubUserSearchParams, globalSearchParams?: GithubSearchParams }): string {

    let q = query;

    if (!searchParams) {
      return q;
    }

    if (searchParams.advancedSearchParams) {
      const advancedSearchParams = searchParams.advancedSearchParams;

      if (advancedSearchParams.exactMatch) {
        q = `${advancedSearchParams.exactMatch}:${query}`;
      }

      if (searchParams?.advancedSearchParams?.accountType) {
        q += `+type:${searchParams?.advancedSearchParams.accountType}`;
      }

      if (advancedSearchParams.containedIn) {
        if (Array.isArray(advancedSearchParams.containedIn)) {
          advancedSearchParams.containedIn.forEach(field => {
            q += `+in:${field} `;
          });
        } else {
          q += `+in:${advancedSearchParams.containedIn} `;
        }
      }

      if (advancedSearchParams.repos) {
        if (typeof advancedSearchParams.repos === 'number') {
          q += `+ repos:${advancedSearchParams.repos} `;
        } else if ('value' in advancedSearchParams.repos) {
          q += `+ repos:${advancedSearchParams.repos.qualifier || ''}${advancedSearchParams.repos.value} `;
        } else {
          q += `+ repos:${advancedSearchParams.repos.from}..${advancedSearchParams.repos.to} `;
        }
      }

      if (advancedSearchParams.location) {
        q += `+ location:${advancedSearchParams.location} `;
      }

      if (advancedSearchParams.language) {
        q += `+ language:${advancedSearchParams.language} `;
      }

      if (advancedSearchParams.created) {
        if (typeof advancedSearchParams.created === 'string') {
          q += `+ created:${advancedSearchParams.created} `;
        } else if (advancedSearchParams.created instanceof Date) {
          q += `+ created:${GithubSearchUtils.formatDate(advancedSearchParams.created)} `;
        } else if ('value' in advancedSearchParams.created) {
          const value = advancedSearchParams.created.value instanceof Date ? GithubSearchUtils.formatDate(advancedSearchParams.created.value) : advancedSearchParams.created.value;
          q += `+ created:${advancedSearchParams.created.qualifier || ''}${value} `;
        } else {
          const valueFrom = advancedSearchParams.created.from instanceof Date ? GithubSearchUtils.formatDate(advancedSearchParams.created.from) : advancedSearchParams.created.from;
          const valueTo = advancedSearchParams.created.to instanceof Date ? GithubSearchUtils.formatDate(advancedSearchParams.created.to) : advancedSearchParams.created.to;
          q += `+ created:${valueFrom}..${valueTo} `;
        }

        if (advancedSearchParams.followers) {
          if (typeof advancedSearchParams.followers === 'number') {
            q += `+ followers:${advancedSearchParams.followers} `;
          } else if ('value' in advancedSearchParams.followers) {
            q += `+ followers:${advancedSearchParams.followers.qualifier || ''}${advancedSearchParams.followers.value} `;
          } else {
            q += `+ followers:${advancedSearchParams.followers.from}..${advancedSearchParams.followers.to} `;
          }
        }

        if (advancedSearchParams.sponsorable !== undefined) {
          q += `+ sponsorable:${advancedSearchParams.sponsorable} `;
        }

      }
    }

    if (searchParams?.globalSearchParams?.sort) {
      q += '+sort:' + searchParams?.globalSearchParams.sort.field + (searchParams?.globalSearchParams.sort.direction ? `- ${searchParams?.globalSearchParams.sort.direction} ` : '');
    }

    return q;
  }
}
