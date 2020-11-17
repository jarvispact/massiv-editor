import { curry } from './curry';
import { isNil } from './is-nil';

/* eslint-disable @typescript-eslint/ban-ts-comment */
type GenericObject = { [key: string]: unknown };

export const path = curry((path: string[], obj: GenericObject = {}) => {
    // @ts-ignore
    return path.reduce((accum, pathKey) => {
        if (isNil(accum)) return undefined;
        return !isNil(accum[pathKey]) ? accum[pathKey] : undefined;
    }, obj);
});
