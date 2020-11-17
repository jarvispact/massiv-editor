import { curry } from './curry';

type GenericObject = { [key: string]: unknown };

export const omit = curry((propertyList: string[], obj: GenericObject) => {
    const keys = Object.keys(obj);
    return keys.reduce((accum, key) => {
        if (!propertyList.includes(key)) accum[key] = obj[key];
        return accum;
    }, {} as GenericObject);
});
