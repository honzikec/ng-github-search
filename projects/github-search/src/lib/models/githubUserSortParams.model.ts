import { GithubSortParam } from './githubSortParams.model';


export enum GithubUserSortField {
    Followers = 'followers',
    Repositories = 'repositories',
    joined = 'joined'
}

export interface GithubUserSortParam extends GithubSortParam {
    field: GithubUserSortField;
}
