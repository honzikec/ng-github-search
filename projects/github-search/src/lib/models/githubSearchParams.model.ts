export interface GithubSearchParams {
    page?: number;
    per_page?: number;
    sort?: 'best match' | 'followers' | 'repositories' | 'joined';
}
