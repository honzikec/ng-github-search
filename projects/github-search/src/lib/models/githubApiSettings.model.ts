import { InjectionToken } from '@angular/core';

export const DEFAULT_SEARCH_API_URL = 'https://api.github.com/search/';

export const GITHUB_SEARCH_API_URL: InjectionToken<string> = new InjectionToken<string>('Github search api url (default "https://api.github.com/search/")');
