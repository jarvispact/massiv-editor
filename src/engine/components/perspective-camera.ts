import { mat4, vec3 } from 'gl-matrix';
import { Component } from 'massiv-3d';

type PerspectiveCameraData = {
    translation: vec3;
    upVector: vec3;
    frontVector: vec3;
    viewMatrix: mat4;
    projectionMatrix: mat4;
    fov: number;
    aspect: number;
    near: number;
    far: number;
    dirty: boolean;
};

type PerspectiveCameraArgs = {
    translation: vec3;
    upVector?: vec3;
    frontVector?: vec3;
    fov?: number;
    aspect: number;
    near?: number;
    far?: number;
};

export class PerspectiveCamera implements Component<'PerspectiveCamera', PerspectiveCameraData> {
    type: 'PerspectiveCamera';
    data: PerspectiveCameraData;
    private lookAtVector: vec3;

    constructor(args: PerspectiveCameraArgs) {
        this.type = 'PerspectiveCamera';
        this.data = {
            translation: args.translation,
            upVector: args.upVector || vec3.fromValues(0, 1, 0),
            frontVector: args.frontVector || vec3.fromValues(0, 0, -1),
            viewMatrix: mat4.fromValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
            projectionMatrix: mat4.fromValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
            fov: args.fov || 45,
            aspect: args.aspect,
            near: args.near || 0.1,
            far: args.far || 1000,
            dirty: true,
        };

        this.lookAtVector = vec3.fromValues(this.data.frontVector[0], this.data.frontVector[1], this.data.frontVector[2]);
        vec3.scale(this.lookAtVector, this.lookAtVector, 1000);

        mat4.lookAt(this.data.viewMatrix, this.data.translation, this.lookAtVector, this.data.upVector);
        mat4.perspective(this.data.projectionMatrix, this.data.fov, this.data.aspect, this.data.near, this.data.far);
    }

    setAspect(aspect: number) {
        this.data.aspect = aspect;
        mat4.perspective(this.data.projectionMatrix, this.data.fov, this.data.aspect, this.data.near, this.data.far);
        this.data.dirty = true;
        return this;
    }

    setTranslation(x: number, y: number, z: number) {
        this.data.translation[0] = x;
        this.data.translation[1] = y;
        this.data.translation[2] = z;
        mat4.lookAt(this.data.viewMatrix, this.data.translation, this.lookAtVector, this.data.upVector);
        this.data.dirty = true;
        return this;
    }

    lookAt(x: number, y: number, z: number) {
        this.lookAtVector[0] = x;
        this.lookAtVector[1] = y;
        this.lookAtVector[2] = z;
        mat4.lookAt(this.data.viewMatrix, this.data.translation, this.lookAtVector, this.data.upVector);
        this.data.dirty = true;
        return this;
    }
}
