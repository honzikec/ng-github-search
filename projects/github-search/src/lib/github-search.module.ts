import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { UrlInterceptor } from './interceptors/url.interceptor';
import { DEFAULT_SEARCH_API_URL, GITHUB_SEARCH_API_URL } from './models/githubApiSettings.model';



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  exports: [],
  providers: [
    { provide: GITHUB_SEARCH_API_URL, useValue: DEFAULT_SEARCH_API_URL },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true
    }
  ]
})
export class GithubSearchModule { }
