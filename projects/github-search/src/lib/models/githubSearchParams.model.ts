import { GithubSortParam } from './githubSortParams.model';

export interface GithubSearchParams {
    page?: number;
    per_page?: number;
    sort?: GithubSortParam;
}
