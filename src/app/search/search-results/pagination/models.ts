export interface PaginationParams {
    total: number;
    perPage: number;
    page: number;
}

export interface PaginationLink {
    page?: number;
    label: string;
}

export const GITHUB_SEARCH_RECORD_LIMIT = 1000;