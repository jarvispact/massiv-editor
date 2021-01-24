import { Component } from 'massiv-3d';

export class RenderableTag implements Component<'RenderableTag', null> {
    type: 'RenderableTag';
    data: null;

    constructor() {
        this.type = 'RenderableTag';
        this.data = null;
    }
}
