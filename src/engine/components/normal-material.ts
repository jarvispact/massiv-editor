import { Component } from 'massiv-3d';

type NormalMaterialData = {
    opacity: number;
};

export class NormalMaterial implements Component<'NormalMaterial', NormalMaterialData> {
    type: 'NormalMaterial';
    data: NormalMaterialData;

    constructor(args?: Partial<NormalMaterialData>) {
        this.type = 'NormalMaterial';
        this.data = {
            opacity: args && args.opacity ? args.opacity : 1,
        };
    }
}
