import { vec3 } from 'gl-matrix';
import { Component } from 'massiv-3d';

type ColorMaterialData = {
    color: vec3;
    opacity: number;
};

type ColorMaterialArgs = {
    color: vec3;
    opacity?: number;
};

export class ColorMaterial implements Component<'ColorMaterial', ColorMaterialData> {
    type: 'ColorMaterial';
    data: ColorMaterialData;

    constructor(args: ColorMaterialArgs) {
        this.type = 'ColorMaterial';
        this.data = {
            color: args.color,
            opacity: args && args.opacity ? args.opacity : 1,
        };
    }
}
