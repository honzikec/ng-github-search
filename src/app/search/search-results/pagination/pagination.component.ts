import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SearchService } from '../../search.service';
import { GITHUB_SEARCH_RECORD_LIMIT, PaginationLink, PaginationParams } from './models';

@Component({
  selector: 'ghs-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnDestroy {
  private readonly _unsubscribe = new Subject<void>();

  private _links: PaginationLink[] = [];

  private _page = 1;

  private _totalRecords = 0;
  private _totalAvailableRecords = 0;

  public get page(): number {
    return this._page;
  }

  public get totalAvailableRecords(): number {
    return this._totalAvailableRecords;
  }

  public get totalRecords(): number {
    return this._totalRecords;
  }

  public get links(): PaginationLink[] {
    return this._links;
  }

  public displayLinksLimit = 10;

  public constructor(
    private readonly _searchService: SearchService
  ) {
    this._searchService.paginationParams$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(params => {
        this._page = params.page;
        this._links = this.generateLinks(params);
      });
  }

  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  public changePage(page: number): void {
    this._searchService.goToPage(page);
  }

  private generateLinks(params: PaginationParams): PaginationLink[] {

    this._totalAvailableRecords = Math.min(params.total, GITHUB_SEARCH_RECORD_LIMIT);
    this._totalRecords = params.total;

    const totalPages = Math.floor(this._totalAvailableRecords / params.perPage);

    let links: PaginationLink[] = [];

    if (totalPages <= this.displayLinksLimit) {
      links = Array(totalPages).fill(0).map((v: number, i: number) => { const page = i + 1; const label = page.toString(); return { page, label } });
    } else {

      // Borrowed some logic from https://jasonwatmore.com/post/2018/08/07/javascript-pure-pagination-logic-in-vanilla-js-typescript

      let startPage = 1;
      let endPage = 1;

      let maxPagesBeforeCurrentPage = Math.floor(this.displayLinksLimit / 2);
      let maxPagesAfterCurrentPage = Math.ceil(this.displayLinksLimit / 2) - 1;
      if (params.page <= maxPagesBeforeCurrentPage) {
        // current page near the start
        startPage = 1;
        endPage = this.displayLinksLimit;
      } else if (params.page + maxPagesAfterCurrentPage >= totalPages) {
        // current page near the end
        startPage = totalPages - this.displayLinksLimit + 1;
        endPage = totalPages;
      } else {
        // current page somewhere in the middle
        startPage = params.page - maxPagesBeforeCurrentPage;
        endPage = params.page + maxPagesAfterCurrentPage;
      }

      if (startPage !== 1) {
        links.push({ page: 1, label: '1' });
        links.push({ label: '...' });
      }

      links = links.concat(Array.from(Array((endPage + 1) - startPage).keys()).map(i => { const page = startPage + i; const label = page.toString(); return { page, label } }));

      if (endPage !== totalPages) {
        links.push({ label: '...' });
        links.push({ page: totalPages, label: totalPages.toString() });
      }

    }

    return links;

  }

}
