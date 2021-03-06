export interface GithubSearchResult<T> {
  total_count: number,
  incomplete_results: boolean,
  items: Array<T>
}