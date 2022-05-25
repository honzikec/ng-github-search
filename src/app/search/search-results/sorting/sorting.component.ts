import { Component } from '@angular/core';
import { GithubUserSortField, GithubUserSortParam } from 'github-search';
import { SearchService } from '../../search.service';

@Component({
  selector: 'ghs-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent {

  private _sortDirection: 'asc' | 'desc' = 'desc';

  public sortBy: '' | GithubUserSortField = '';

  public get sortDirection(): 'asc' | 'desc' {
    return this._sortDirection;
  }

  public constructor(
    private readonly _searchService: SearchService
  ) { }

  public sort(): void {
    let sortParam: GithubUserSortParam | undefined;

    if (this.sortBy) {
      sortParam = { field: this.sortBy, direction: this.sortDirection };
    }

    this._searchService.sort(sortParam);
  }

  public setDirection(direction: 'desc' | 'asc'): void {
    this._sortDirection = direction;
    this.sort();
  }

}
