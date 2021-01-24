import { Component } from 'massiv-3d';

type GeometryData = {
    positions: Array<number>;
    indices?: Array<number>;
    uvs?: Array<number>;
    normals?: Array<number>;
    colors?: Array<number>;
    tangents?: Array<number>;
    bitangents?: Array<number>;
};

export class Geometry implements Component<'Geometry', GeometryData> {
    type: 'Geometry';
    data: GeometryData;

    constructor(data: GeometryData) {
        this.type = 'Geometry';
        this.data = data;
    }
}
