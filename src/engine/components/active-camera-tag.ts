import { Component } from 'massiv-3d';

export class ActiveCameraTag implements Component<'ActiveCameraTag', null> {
    type: 'ActiveCameraTag';
    data: null;

    constructor() {
        this.type = 'ActiveCameraTag';
        this.data = null;
    }
}
