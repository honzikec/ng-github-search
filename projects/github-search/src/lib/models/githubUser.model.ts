import { GithubMatch } from './githubMatch.model'

export interface GithubUser {
    avatar_url: string;
    events_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    html_url: string;
    id: number;
    node_id: string;
    login: string;
    organizations_url: string;
    received_events_url: string;
    repos_url: string;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    type: string;
    url: string;
    score: number;

    public_repos?: number;
    public_gists?: number;
    followers?: number;
    following?: number;
    created_at?: string;
    updated_at?: string;
    name?: string | null;
    bio?: string | null;
    email?: string | null;
    location?: string | null;
    hireable?: boolean | null;
    text_matches?: Array<GithubMatch>;
    blog?: string | null;
    company?: string | null;
    suspended_at?: string | null;
}