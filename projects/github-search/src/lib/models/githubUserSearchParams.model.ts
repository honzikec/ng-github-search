export enum GithubAccountType {
    User = 'user',
    Organization = 'org'
}

export enum GithubUserSearchExactMatchField {
    User = 'user',
    Organization = 'org',
    FullName = 'fullname'
}

export enum GithubUserField {
    Username = 'user',
    FullName = 'name',
    Email = 'email'
}

export enum GithubSearchQuantifier {
    Equals = '=',
    More = '>',
    MoreOrEqual = '>=',
    Less = '<',
    LessOrEqual = '<='
}

export type GithubUserCreated = Date | `${number}-${number}-${number}`;

export type GithubSearchRange<T> = number | { value: T, quantifier?: GithubSearchQuantifier } | { from: T, to: T };

export interface GithubUserSearchParams {
    accountType?: GithubAccountType;
    containedIn?: GithubUserField | GithubUserField[];
    exactMatch?: GithubUserSearchExactMatchField;
    repos?: GithubSearchRange<number>;
    location?: string;
    language?: string;
    created?: GithubSearchRange<GithubUserCreated>;
    followers?: GithubSearchRange<number>;
    sponsorable?: boolean;
}
