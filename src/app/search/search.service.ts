import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GithubSearchService, GithubSearchUtils, GithubUserField, GithubUserSearchExactMatchField, GithubUserSearchParams } from 'github-search';
import { Subject, takeUntil } from 'rxjs';
import { ControlMeta, DATE_FORMAT_REGEX } from './search-input/advanced-search/models';
import { SearchUtils } from './search.utils';
import { SearchDataBuilder } from './searchData.builder';

@Injectable({
  providedIn: 'root'
})
export class SearchService implements OnDestroy {
  private readonly _unsubscribe = new Subject<void>();

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
    private _githubSearchService: GithubSearchService
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
  }

  public search(): void {
    let searchParams: GithubUserSearchParams | undefined;
    // TODO: active / inactive state
    if (this.advancedSearchOpen) {
      searchParams = SearchDataBuilder.buildParams(this._advancedSearchForm.value);
    }
    this._githubSearchService.searchUser(this.searchQuery, searchParams).subscribe(result => {
      console.log(result);
    });
  }

  public activateControl(controlMeta: ControlMeta): void {
    SearchUtils.moveBetweenArrays(controlMeta, this._advancedSearchControls.inactive, this._advancedSearchControls.active);
    this._advancedSearchForm.addControl(controlMeta.key, controlMeta.control);
  }

  public deactivateControl(controlMeta: ControlMeta): void {
    SearchUtils.moveBetweenArrays(controlMeta, this._advancedSearchControls.active, this._advancedSearchControls.inactive);
    this._advancedSearchForm.removeControl(controlMeta.key);
  }

}
