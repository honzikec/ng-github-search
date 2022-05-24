import { Inject, Injectable } from '@angular/core';
import {
    HttpHandler,
    HttpRequest,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { GITHUB_SEARCH_API_URL } from '../models/githubApiSettings.model';



@Injectable()
export class UrlInterceptor implements HttpInterceptor {

    public constructor(
        @Inject(GITHUB_SEARCH_API_URL) private readonly _searchApiUrl: string
    ) {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            url: this._searchApiUrl + request.url
        });
        return next.handle(request);
    }
}
