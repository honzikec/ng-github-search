import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchService } from '../search.service';

@Component({
  selector: 'ghs-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnDestroy {
  private readonly _unsubscribe = new Subject<void>();

  private _searchActivated = false;

  public set advancedSearchOpen(open: boolean) {
    this._searchService.advancedSearchOpen = open;
  }

  public get advancedSearchOpen(): boolean {
    return this._searchService.advancedSearchOpen;
  }

  public get searchQuery(): string {
    return this._searchService.searchQuery;
  }

  public set searchQuery(query: string) {
    this._searchService.searchQuery = query;
  }

  public get searchActivated(): boolean {
    return this._searchActivated;
  }

  public constructor(
    private _searchService: SearchService
  ) { }

  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  public toggleAdvancedSearch(): void {
    this.advancedSearchOpen = !this.advancedSearchOpen;
  }

  public submit(): void {
    if (!this._searchService.searchQuery) {
      return;
    }
    this._searchService.search();
    this._searchActivated = true;
  }


}
