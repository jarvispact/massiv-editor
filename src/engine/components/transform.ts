import { mat4, quat, vec3 } from 'gl-matrix';

const translationArraySize = 3;
const scalingArraySize = 3;
const quaternionArraySize = 4;
const modelMatrixArraySize = 16;
const dirtyArraySize = 1;

const translationSize = translationArraySize * Float32Array.BYTES_PER_ELEMENT;
const scalingSize = scalingArraySize * Float32Array.BYTES_PER_ELEMENT;
const quaternionSize = quaternionArraySize * Float32Array.BYTES_PER_ELEMENT;
const modelMatrixSize = modelMatrixArraySize * Float32Array.BYTES_PER_ELEMENT;
const dirtySize = dirtyArraySize * Float32Array.BYTES_PER_ELEMENT;
const totalSize = translationSize + scalingSize + quaternionSize + modelMatrixSize + dirtySize;

const translationOffset = 0;
const scalingOffset = translationSize;
const quaternionOffset = translationSize + scalingSize;
const modelMatrixOffset = translationSize + scalingSize + quaternionSize;
const dirtyOffset = translationSize + scalingSize + quaternionSize + modelMatrixSize;

export const transformBufferLayout = {
    translation: { offset: translationOffset, size: translationSize },
    scaling: { offset: scalingOffset, size: scalingSize },
    quaternion: { offset: quaternionOffset, size: quaternionSize },
    modelMatrix: { offset: modelMatrixOffset, size: modelMatrixSize },
    dirty: { offset: dirtyOffset, size: dirtySize },
};

export type TransformBufferLayout = typeof transformBufferLayout;

type CreateTransformArgs = {
    translation?: vec3;
    scaling?: vec3;
    quaternion?: quat;
};

export const transformFromBuffer = (buffer: SharedArrayBuffer) => ({
    type: 'Transform' as const,
    buffer,
    data: {
        translation: new Float32Array(buffer, transformBufferLayout.translation.offset, translationArraySize),
        scaling: new Float32Array(buffer, transformBufferLayout.scaling.offset, scalingArraySize),
        quaternion: new Float32Array(buffer, transformBufferLayout.quaternion.offset, quaternionArraySize),
        modelMatrix: new Float32Array(buffer, transformBufferLayout.modelMatrix.offset, modelMatrixArraySize),
        dirty: new Float32Array(buffer, transformBufferLayout.dirty.offset, dirtyArraySize),
    },
});

export type Transform = ReturnType<typeof transformFromBuffer>;

export const createTransform = (args?: CreateTransformArgs): Transform => {
    const data = new SharedArrayBuffer(totalSize);
    const t = transformFromBuffer(data);

    if (args && args.translation) {
        vec3.copy(t.data.translation, args.translation);
    } else {
        vec3.set(t.data.translation, 0, 0, 0);
    }

    if (args && args.scaling) {
        vec3.copy(t.data.scaling, args.scaling);
    } else {
        vec3.set(t.data.scaling, 1, 1, 1);
    }

    if (args && args.quaternion) {
        quat.copy(t.data.quaternion, args.quaternion);
    } else {
        quat.set(t.data.quaternion, 0, 0, 0, 1);
    }

    mat4.fromRotationTranslationScale(t.data.modelMatrix, t.data.quaternion, t.data.translation, t.data.scaling);
    t.data.dirty[0] = 1;

    return t;
};

const tmpVec3 = vec3.create();
const tmpQuat = quat.create();

export const Transform = {
    translate: (t: Transform, x: number, y: number, z: number) => {
        tmpVec3[0] = x;
        tmpVec3[1] = y;
        tmpVec3[2] = z;
        vec3.add(t.data.translation, t.data.translation, tmpVec3);
        mat4.fromRotationTranslationScale(t.data.modelMatrix, t.data.quaternion, t.data.translation, t.data.scaling);
        t.data.dirty[0] = 1;
    },
    setTranslation: (t: Transform, x: number, y: number, z: number) => {
        t.data.translation[0] = x;
        t.data.translation[1] = y;
        t.data.translation[2] = z;
        mat4.fromRotationTranslationScale(t.data.modelMatrix, t.data.quaternion, t.data.translation, t.data.scaling);
        t.data.dirty[0] = 1;
    },
    setTranslationX: (t: Transform, x: number) => {
        t.data.translation[0] = x;
        mat4.fromRotationTranslationScale(t.data.modelMatrix, t.data.quaternion, t.data.translation, t.data.scaling);
        t.data.dirty[0] = 1;
    },
    setTranslationY: (t: Transform, y: number) => {
        t.data.translation[1] = y;
        mat4.fromRotationTranslationScale(t.data.modelMatrix, t.data.quaternion, t.data.translation, t.data.scaling);
        t.data.dirty[0] = 1;
    },
    setTranslationZ: (t: Transform, z: number) => {
        t.data.translation[2] = z;
        mat4.fromRotationTranslationScale(t.data.modelMatrix, t.data.quaternion, t.data.translation, t.data.scaling);
        t.data.dirty[0] = 1;
    },
    setScaling: (t: Transform, x: number, y: number, z: number) => {
        t.data.scaling[0] = x;
        t.data.scaling[1] = y;
        t.data.scaling[2] = z;
        mat4.fromRotationTranslationScale(t.data.modelMatrix, t.data.quaternion, t.data.translation, t.data.scaling);
        t.data.dirty[0] = 1;
    },
    setScalingX: (t: Transform, x: number) => {
        t.data.scaling[0] = x;
        mat4.fromRotationTranslationScale(t.data.modelMatrix, t.data.quaternion, t.data.translation, t.data.scaling);
        t.data.dirty[0] = 1;
    },
    setScalingY: (t: Transform, y: number) => {
        t.data.scaling[1] = y;
        mat4.fromRotationTranslationScale(t.data.modelMatrix, t.data.quaternion, t.data.translation, t.data.scaling);
        t.data.dirty[0] = 1;
    },
    setScalingZ: (t: Transform, z: number) => {
        t.data.scaling[2] = z;
        mat4.fromRotationTranslationScale(t.data.modelMatrix, t.data.quaternion, t.data.translation, t.data.scaling);
        t.data.dirty[0] = 1;
    },
    rotate: (t: Transform, x: number, y: number, z: number) => {
        quat.fromEuler(tmpQuat, x, y, z);
        quat.multiply(t.data.quaternion, t.data.quaternion, tmpQuat);
        mat4.fromRotationTranslationScale(t.data.modelMatrix, t.data.quaternion, t.data.translation, t.data.scaling);
        t.data.dirty[0] = 1;
    },
    setRotation: (t: Transform, x: number, y: number, z: number) => {
        quat.fromEuler(t.data.quaternion, x, y, z);
        mat4.fromRotationTranslationScale(t.data.modelMatrix, t.data.quaternion, t.data.translation, t.data.scaling);
        t.data.dirty[0] = 1;
    },
    setQuaternion: (t: Transform, x: number, y: number, z: number, w: number) => {
        t.data.quaternion[0] = x;
        t.data.quaternion[1] = y;
        t.data.quaternion[2] = z;
        t.data.quaternion[3] = w;
        mat4.fromRotationTranslationScale(t.data.modelMatrix, t.data.quaternion, t.data.translation, t.data.scaling);
        t.data.dirty[0] = 1;
    },
    setQuaternionX: (t: Transform, x: number) => {
        t.data.quaternion[0] = x;
        mat4.fromRotationTranslationScale(t.data.modelMatrix, t.data.quaternion, t.data.translation, t.data.scaling);
        t.data.dirty[0] = 1;
    },
    setQuaternionY: (t: Transform, y: number) => {
        t.data.quaternion[1] = y;
        mat4.fromRotationTranslationScale(t.data.modelMatrix, t.data.quaternion, t.data.translation, t.data.scaling);
        t.data.dirty[0] = 1;
    },
    setQuaternionZ: (t: Transform, z: number) => {
        t.data.quaternion[2] = z;
        mat4.fromRotationTranslationScale(t.data.modelMatrix, t.data.quaternion, t.data.translation, t.data.scaling);
        t.data.dirty[0] = 1;
    },
    setQuaternionW: (t: Transform, w: number) => {
        t.data.quaternion[3] = w;
        mat4.fromRotationTranslationScale(t.data.modelMatrix, t.data.quaternion, t.data.translation, t.data.scaling);
        t.data.dirty[0] = 1;
    },
    isDirty: (t: Transform) => t.data.dirty[0] === 1,
    setDirty: (t: Transform, dirty: boolean) => {
        t.data.dirty[0] = Number(dirty);
    },
};
