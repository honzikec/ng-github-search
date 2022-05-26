import { Component, OnInit } from '@angular/core';
import { GithubUser } from 'github-search';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SearchService } from '../search.service';

@Component({
  selector: 'ghs-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  private readonly _unsubscribe = new Subject<void>();

  private _results: GithubUser[] | undefined;

  private _errors: { message: string }[] | null = null;

  public get results(): GithubUser[] | undefined {
    return this._results;
  }

  public get errors(): { message: string }[] | null {
    return this._errors;
  }

  public constructor(
    private readonly _searchService: SearchService
  ) { }

  public ngOnInit(): void {
    this._searchService.results$.pipe(takeUntil(this._unsubscribe)).subscribe(results => {
      this._results = results;
    });
    this._searchService.errors$.pipe(takeUntil(this._unsubscribe)).subscribe(errors => {
      this._errors = errors;
    });

  }

  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

}
