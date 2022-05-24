import { Component, OnInit } from '@angular/core';
import { GithubSearchService } from 'github-search';

@Component({
  selector: 'ghs-search',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-github-search';

  public constructor(
    private readonly _githubService: GithubSearchService
  ) {
  }

  public ngOnInit(): void {

    // this._githubService.searchUser('hon').subscribe(res => {
    //   console.log('search res', res);
    // });

  }
}
