export class SearchUtils {
    public static moveBetweenArrays(item: unknown, sourceArray: unknown[], targetArray: unknown[]): void {
        const sourceIndex = sourceArray.findIndex(sourceItem => sourceItem === item);
        if (sourceIndex === -1) {
            console.warn('Could not move item from array, the source array does not contain given item!');
            return;
        }
        sourceArray.splice(sourceIndex, 1);
        targetArray.push(item);
    }

}