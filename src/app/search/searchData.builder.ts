import { GithubAccountType, GithubSearchQualifier, GithubUserField, GithubUserSearchExactMatchField, GithubUserSearchParams } from 'github-search';

export interface SearchFormData {
    accountType: GithubAccountType | 'all';
    containedIn: GithubUserField[];
    exactMatch: boolean;
    exactMatchField: GithubUserSearchExactMatchField;
    repos?: {
        qualifier: GithubSearchQualifier | 'range',
        valueStart: number,
        valueEnd: number
    };
    location?: string;
    language?: string;
    created?: {
        qualifier: GithubSearchQualifier | 'range',
        valueStart: `${number}-${number}-${number}`,
        valueEnd: `${number}-${number}-${number}`
    };
    followers?: {
        qualifier: GithubSearchQualifier | 'range',
        valueStart: number,
        valueEnd: number
    };
    sponsorable?: boolean;
}

export class SearchDataBuilder {

    public static buildParams(formData: SearchFormData): GithubUserSearchParams {
        const params: GithubUserSearchParams = {};

        if (formData.accountType !== 'all') {
            params.accountType = formData.accountType;
        }

        if (formData.exactMatch) {
            params.exactMatch = formData.exactMatchField;
        } else {
            params.containedIn = formData.containedIn;
        }

        if (formData.repos) {
            if (formData.repos.qualifier === 'range') {
                params.repos = { from: formData.repos.valueStart, to: formData.repos.valueEnd };
            } else {
                params.repos = { value: formData.repos.valueStart, qualifier: formData.repos.qualifier };
            }
        }

        if (formData.location) {
            params.location = formData.location;
        }

        if (formData.language) {
            params.language = formData.language;
        }

        if (formData.created) {
            if (formData.created.qualifier === 'range') {
                params.created = { from: formData.created.valueStart, to: formData.created.valueEnd };
            } else {
                params.created = { value: formData.created.valueStart, qualifier: formData.created.qualifier };
            }
        }

        if (formData.followers) {
            if (formData.followers.qualifier === 'range') {
                params.followers = { from: formData.followers.valueStart, to: formData.followers.valueEnd };
            } else {
                params.followers = { value: formData.followers.valueStart, qualifier: formData.followers.qualifier };
            }
        }

        if (formData.sponsorable !== undefined) {
            params.sponsorable = formData.sponsorable;
        }

        return params;
    }

}