/* eslint-disable unicorn/consistent-function-scoping */
import { BadRequestException } from '@nestjs/common';
import { parseValueToBoolean } from './to-boolean';

describe('Parse Value To Boolean', () => {
    it('Should parse string "true" or "false" to boolean', () => {
        const trueValue = parseValueToBoolean('true');
        const falseValue = parseValueToBoolean('false');

        expect(typeof trueValue).toBe('boolean');
        expect(typeof falseValue).toBe('boolean');
        expect(trueValue).toBe(true);
        expect(falseValue).toBe(false);
    });

    it('Should return the input value when the value is a boolean already', () => {
        const value = true;
        const result = parseValueToBoolean(value);

        expect(result).toBe(value);
        expect(result).toEqual(value);
    });

    it('Should parse "on", "yes" and "1" to true', () => {
        const on = parseValueToBoolean('on');
        const yes = parseValueToBoolean('yes');
        const one = parseValueToBoolean('1');

        expect(on).toBe(true);
        expect(yes).toBe(true);
        expect(one).toBe(true);
    });

    it('Should parse "off", "no" and "0" to false', () => {
        const off = parseValueToBoolean('off');
        const no = parseValueToBoolean('no');
        const zero = parseValueToBoolean('0');

        expect(off).toBe(false);
        expect(no).toBe(false);
        expect(zero).toBe(false);
    });

    it('Should throw an BadRequestException if the value is not parsable to boolean', () => {
        const error = (): boolean => parseValueToBoolean('asd');
        expect(error).toThrow(BadRequestException);
    });
});
/* eslint-enable unicorn/consistent-function-scoping */
