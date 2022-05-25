import { Component, OnInit } from '@angular/core';
import { GithubUser } from 'github-search';
import { Observable } from 'rxjs';
import { SearchService } from '../search.service';

@Component({
  selector: 'ghs-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  public get results$(): Observable<GithubUser[]> {
    return this._searchService.results$;
  }

  public constructor(
    private readonly _searchService: SearchService
  ) { }

  ngOnInit(): void {
  }

}
