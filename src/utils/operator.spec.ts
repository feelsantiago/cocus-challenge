import { of } from 'rxjs';
import { filterListMap } from './operators';

describe('Filter List Map Operator', () => {
    it('Should filter and transform each element from a list', () => {
        of([1, 2, 3, 4])
            .pipe(
                filterListMap(
                    (value) => value < 3,
                    (value) => value * 2,
                ),
            )
            .subscribe(
                (value) => {
                    expect(Array.isArray(value)).toBe(true);
                    expect(value.length).toBe(2);
                    expect(value[0]).toBe(2);
                },
                () => fail('it should not reach here'),
                () => expect(true).toBe(true),
            );
    });

    it('Should filter, transform and merge a new observable for each element from a list', () => {
        of([1, 2, 3, 4])
            .pipe(
                filterListMap(
                    (value) => value < 3,
                    (value) => value * 2,
                    (value) => of(value + 5),
                ),
            )
            .subscribe(
                (value) => {
                    expect(Array.isArray(value)).toBe(true);
                    expect(value.length).toBe(2);
                    expect(value[0]).toBe(7);
                },
                () => fail('it should not reach here'),
                () => expect(true).toBe(true),
            );
    });
});
