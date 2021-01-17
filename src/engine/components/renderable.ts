import { Component } from 'massiv-3d';

type RenderableData = {
    positions: Array<number>;
    uvs: Array<number>;
    normals: Array<number>;
};

export class Renderable implements Component<'Renderable', RenderableData> {
    type: 'Renderable';
    data: RenderableData;

    constructor(data: RenderableData) {
        this.type = 'Renderable';
        this.data = data;
    }
}
