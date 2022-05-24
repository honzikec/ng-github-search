export class GithubSearchUtils {
    public static formatDate(date: Date): string {
        return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}-${date.getDay().toString().padStart(2, '0')}`;
    }
}