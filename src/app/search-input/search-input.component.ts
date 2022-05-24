import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'ghs-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnDestroy {
  private readonly _unsubscribe = new Subject<void>();

  private _advancedSearchOpen = false;

  public get advancedSearchOpen(): boolean {
    return this._advancedSearchOpen;
  }

  public searchQuery = '';

  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  public openAdvancedSearch(): void {
    this._advancedSearchOpen = true;
  }

  public closeAdvancedSearch(): void {
    this._advancedSearchOpen = false;
  }


}
