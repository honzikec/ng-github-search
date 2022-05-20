import { Component, OnInit } from '@angular/core';
import { GithubSearchService } from 'github-search';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-github-search';

  constructor(
    private _githubService: GithubSearchService
  ) {
    // this._githubService.foundUsers$.subscribe(users => {
    //   console.log('found', users);
    // });
  }

  public ngOnInit(): void {

    // this._githubService.searchUser('honzikec');

  }
}
