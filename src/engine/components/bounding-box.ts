import { vec3 } from 'gl-matrix';
import { Component } from 'massiv-3d';

type BoundingBoxData = {
    min: vec3;
    max: vec3;
};

type BoundingBoxArgs = {
    min: vec3;
    max: vec3;
};

export class BoundingBox implements Component<'BoundingBox', BoundingBoxData> {
    type: 'BoundingBox';
    data: BoundingBoxData;

    constructor(args: BoundingBoxArgs) {
        this.type = 'BoundingBox';
        this.data = {
            min: vec3.create(),
            max: vec3.create(),
        };

        vec3.copy(this.data.min, args.min);
        vec3.copy(this.data.max, args.max);
    }

    static fromPositions(positions: Array<number>, translation: vec3) {
        return new BoundingBox(computeBoundingBox(positions, translation));
    }
}

export const computeBoundingBox = (positions: Array<number>, translation: vec3) => {
    const min: [number, number, number] = [0, 0, 0];
    const max: [number, number, number] = [0, 0, 0];

    // the following separation for index 0 and the rest is done
    // in the case that the geometry is translated, scaled or rotated.

    // initialize from first position
    const x = positions[0];
    const y = positions[1];
    const z = positions[2];

    min[0] = x;
    min[1] = y;
    min[2] = z;

    max[0] = x;
    max[1] = y;
    max[2] = z;

    // starting at 1
    for (let i = 3; i < positions.length; i += 3) {
        const x = positions[i + 0];
        const y = positions[i + 1];
        const z = positions[i + 2];

        if (x <= min[0]) min[0] = x;
        if (y <= min[1]) min[1] = y;
        if (z <= min[2]) min[2] = z;

        if (x >= max[0]) max[0] = x;
        if (y >= max[1]) max[1] = y;
        if (z >= max[2]) max[2] = z;
    }

    // in case of a plane min and max have the same value on 1 axis
    // this creates issues with the ray - aabb intersection algorithm

    if (min[0] === max[0]) {
        min[0] -= 0.0001;
        max[0] += 0.0001;
    }

    if (min[1] === max[1]) {
        min[1] -= 0.0001;
        max[1] += 0.0001;
    }

    if (min[2] === max[2]) {
        min[2] -= 0.0001;
        max[2] += 0.0001;
    }

    vec3.add(min, min, translation);
    vec3.add(max, max, translation);

    return { min, max };
};

export const getBoundingBoxCenter = (out: vec3, min: vec3, max: vec3) => {
    out[0] = (min[0] + max[0]) / 2;
    out[1] = (min[1] + max[1]) / 2;
    out[2] = (min[2] + max[2]) / 2;
    return out;
};
