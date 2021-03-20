import { from, of, OperatorFunction, pipe, Observable } from 'rxjs';
import { filter, map, mergeMap, switchMap, toArray } from 'rxjs/operators';

type FilterFunction<T> = (data: T) => boolean;
type MapFunction<T, R> = (data: T) => R;
type MergeFunction<T> = (data: T) => Observable<T>;

const filterListMapOperation = <T, R>(
    predicate: FilterFunction<T>,
    project: MapFunction<T, R>,
    merge?: MergeFunction<R>,
): OperatorFunction<T[], R[]> =>
    pipe(
        switchMap((list) => from(list)),
        filter(predicate),
        map(project),
        mergeMap((value) => (merge ? merge(value) : of(value))),
        toArray(),
    );

export function filterListMap<T, R>(
    predicate: FilterFunction<T>,
    project: MapFunction<T, R>,
    merge?: MergeFunction<R>,
): OperatorFunction<T[], R[]> {
    return filterListMapOperation(predicate, project, merge);
}
