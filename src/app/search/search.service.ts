import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GithubSearchService, GithubSearchUtils, GithubUser, GithubUserField, GithubUserSearchExactMatchField, GithubUserSearchParams, GithubUserSortParam } from 'github-search';
import { GithubSearchParams } from 'projects/github-search/src/lib/models/githubSearchParams.model';
import { Subject, takeUntil } from 'rxjs';
import { ControlMeta, DATE_FORMAT_REGEX } from './search-input/advanced-search/models';
import { PaginationParams } from './search-results/pagination/models';
import { SearchUtils } from './search.utils';
import { SearchDataBuilder } from './searchData.builder';

@Injectable({
  providedIn: 'root'
})
export class SearchService implements OnDestroy {
  private readonly _unsubscribe = new Subject<void>();

  private readonly _resultsSubject = new Subject<GithubUser[]>();
  private readonly _paginationParamsSubject = new Subject<PaginationParams>();

  private readonly _recordCache = new Map<number, { records: GithubUser[], paginationParams: PaginationParams }>();

  public results$ = this._resultsSubject.asObservable();
  public paginationParams$ = this._paginationParamsSubject.asObservable();

  private _advancedSearchForm: FormGroup = new FormGroup({
    accountType: new FormControl('all'),
    containedIn: new FormControl([GithubUserField.Username, GithubUserField.Email]),
    exactMatch: new FormControl(false),
    exactMatchField: new FormControl({ value: GithubUserSearchExactMatchField.User, disabled: true })
  });

  private _advancedSearchControls: { active: ControlMeta[], inactive: ControlMeta[] } = {
    inactive: [
      {
        key: 'repos',
        type: 'number',
        label: 'Number of repos',
        hasQualifier: true,
        control: new FormGroup({
          qualifier: new FormControl('>'),
          valueStart: new FormControl(0, [Validators.min(0)]),
          valueEnd: new FormControl(999, [Validators.min(0)])
        })
      },
      {
        key: 'location',
        type: 'text',
        label: 'Location',
        control: new FormControl('')
      },
      {
        key: 'language',
        type: 'text',
        label: 'Programming language',
        control: new FormControl('')
      },
      {
        key: 'created',
        type: 'date',
        label: 'Created date',
        hasQualifier: true,
        control: new FormGroup({
          qualifier: new FormControl('>'),
          valueStart: new FormControl(GithubSearchUtils.formatDate(new Date()), [Validators.pattern(DATE_FORMAT_REGEX)]),
          valueEnd: new FormControl(GithubSearchUtils.formatDate(new Date()), [Validators.pattern(DATE_FORMAT_REGEX)])
        })
      },
      {
        key: 'followers',
        type: 'number',
        label: 'Number of followers',
        hasQualifier: true,
        control: new FormGroup({
          qualifier: new FormControl('>'),
          valueStart: new FormControl(0, [Validators.min(0)]),
          valueEnd: new FormControl(999, [Validators.min(0)])
        })
      },
      {
        key: 'sponsorable',
        type: 'checkbox',
        label: 'Sponsorable',
        control: new FormControl(true)
      }
    ],
    active: []
  };

  public get advancedSearchForm(): FormGroup {
    return this._advancedSearchForm;
  }

  public get advancedSearchControls(): { active: ControlMeta[], inactive: ControlMeta[] } {
    return this._advancedSearchControls;
  }

  public searchQuery = '';
  public advancedSearchOpen = false;

  public constructor(
    private readonly _githubSearchService: GithubSearchService
  ) {

    this._advancedSearchForm.get('exactMatch')?.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((exactMatch: boolean) => {
        if (exactMatch) {
          this._advancedSearchForm.get('exactMatchField')?.enable();
          this._advancedSearchForm.get('containedIn')?.disable();
        } else {
          this._advancedSearchForm.get('exactMatchField')?.disable();
          this._advancedSearchForm.get('containedIn')?.enable();
        }
      });

  }

  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
    this._recordCache.clear();
  }

  public search(): void {
    this._recordCache.clear();
    this.searchInternal(1);
  }

  public goToPage(page: number): void {
    this.searchInternal(page);
  }

  public sort(sortParam: GithubUserSortParam | undefined): void {
    this._recordCache.clear();
    this.searchInternal(1, sortParam);
  }

  public activateControl(controlMeta: ControlMeta): void {
    SearchUtils.moveBetweenArrays(controlMeta, this._advancedSearchControls.inactive, this._advancedSearchControls.active);
    this._advancedSearchForm.addControl(controlMeta.key, controlMeta.control);
  }

  public deactivateControl(controlMeta: ControlMeta): void {
    SearchUtils.moveBetweenArrays(controlMeta, this._advancedSearchControls.active, this._advancedSearchControls.inactive);
    this._advancedSearchForm.removeControl(controlMeta.key);
  }

  private searchInternal(page: number, sort?: GithubUserSortParam): void {
    let advancedSearchParams: GithubUserSearchParams | undefined;
    // TODO: active / inactive state
    if (this.advancedSearchOpen) {
      advancedSearchParams = SearchDataBuilder.buildParams(this._advancedSearchForm.value);
    }

    const globalSearchParams: GithubSearchParams = { page, sort };

    const searchParams = { advancedSearchParams, globalSearchParams };

    const cachedPage = this._recordCache.get(page);

    if (cachedPage) {
      this._resultsSubject.next(cachedPage.records);
      this._paginationParamsSubject.next(cachedPage.paginationParams);
    } else {
      this._githubSearchService.searchUser(this.searchQuery, searchParams).subscribe(result => {
        const paginationParams = { page, total: result.total_count, perPage: 30 };
        const records = result.items;
        this._resultsSubject.next(result.items);
        this._paginationParamsSubject.next(paginationParams);
        this._recordCache.set(page, { records, paginationParams });
      });
    }
  }

}
