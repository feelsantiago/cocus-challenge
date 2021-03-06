import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';

type DecoratorHandle = ReturnType<PropertyDecorator>;
type ReflectionInformation = (target: unknown, key: string) => void;

const valueToBoolean = (key: string, value: unknown): boolean => {
    if (typeof value === 'boolean') {
        return value;
    }

    if (['true', 'on', 'yes', '1'].includes((value as string).toLowerCase())) {
        return true;
    }

    if (['false', 'off', 'no', '0'].includes((value as string).toLowerCase())) {
        return false;
    }

    throw new BadRequestException(`'${key}' must be a boolean value`);
};

const ToBooleanDecorator = (): ReflectionInformation => {
    const toPlain = Transform(
        ({ value }): unknown => {
            return value as unknown;
        },
        {
            toPlainOnly: true,
        },
    );

    const toClass = (target: unknown, key: string): DecoratorHandle => {
        return Transform(
            ({ obj }) => {
                return valueToBoolean(key, (obj as unknown)[key]);
            },
            {
                toClassOnly: true,
            },
        )(target, key);
    };

    return function (target: unknown, key: string) {
        toPlain(target, key);
        toClass(target, key);
    };
};

export function ToBoolean(): ReflectionInformation {
    return ToBooleanDecorator();
}

export function parseValueToBoolean(value: unknown): boolean {
    return valueToBoolean('', value);
}
