import { mat4, quat, vec3 } from 'gl-matrix';
import { Component } from 'massiv-3d';

type TransformData = {
    translation: vec3;
    scaling: vec3;
    quaternion: quat;
    modelMatrix: mat4;
    dirty: boolean;
};

type TransformArgs = {
    translation?: vec3;
    scaling?: vec3;
    rotation?: vec3;
};

export class Transform implements Component<'Transform', TransformData> {
    type: 'Transform';
    data: TransformData;

    constructor(args: TransformArgs = {}) {
        this.type = 'Transform';
        this.data = {
            translation: args.translation || vec3.fromValues(0, 0, 0),
            scaling: args.scaling || vec3.fromValues(1, 1, 1),
            quaternion: quat.fromValues(0, 0, 0, 1),
            modelMatrix: mat4.fromValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
            dirty: true,
        };

        if (args.rotation) quat.fromEuler(this.data.quaternion, args.rotation[0], args.rotation[1], args.rotation[2]);
        mat4.fromRotationTranslationScale(this.data.modelMatrix, this.data.quaternion, this.data.translation, this.data.scaling);
    }
}
