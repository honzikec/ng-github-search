export interface GithubTextMatch {
    object_url: string;
    object_type: string | null;
    property: string;
    fragment: string;
    matches: Array<GithubMatch>;
}

export interface GithubMatch {
    text: string;
    indices: Array<number>;
}


