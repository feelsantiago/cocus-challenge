import { from, MonoTypeOperatorFunction, pipe } from 'rxjs';
import { filter, switchMap, toArray } from 'rxjs/operators';

type FilterFunction<T> = (data: T) => boolean;

const filterListOperation = <T>(fn: FilterFunction<T>): MonoTypeOperatorFunction<T[]> =>
    pipe(
        switchMap((list) => from(list)),
        filter(fn),
        toArray(),
    );

export function filterList<T>(fn: FilterFunction<T>): MonoTypeOperatorFunction<T[]> {
    return filterListOperation(fn);
}
