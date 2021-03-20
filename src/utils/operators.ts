import { from, OperatorFunction, pipe } from 'rxjs';
import { filter, map, switchMap, toArray } from 'rxjs/operators';

type FilterFunction<T> = (data: T) => boolean;
type MapFunction<T, R> = (data: T) => R;

const filterListMapOperation = <T, R>(
    predicate: FilterFunction<T>,
    project: MapFunction<T, R>,
): OperatorFunction<T[], R[]> =>
    pipe(
        switchMap((list) => from(list)),
        filter(predicate),
        map(project),
        toArray(),
    );

export function filterListMap<T, R>(
    predicate: FilterFunction<T>,
    project: MapFunction<T, R>,
): OperatorFunction<T[], R[]> {
    return filterListMapOperation(predicate, project);
}
