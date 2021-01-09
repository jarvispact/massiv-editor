import { Component } from 'massiv-3d';

type GeometryData = {
    positions: Float32Array;
};

type GeometryArgs = {
    positions: Array<number>;
};

export class Geometry implements Component<'Geometry', GeometryData> {
    type: 'Geometry';
    data: GeometryData;

    constructor(args: GeometryArgs) {
        this.type = 'Geometry';
        this.data = {
            positions: new Float32Array(args.positions),
        };
    }
}
