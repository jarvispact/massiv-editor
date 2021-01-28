import { FileLoader, parseObjFile } from 'massiv-3d';
import { useTheme } from 'massiv-design-system';
import React, { useCallback } from 'react';
import { Geometry } from '../../engine/components/geometry';
import { NormalMaterial } from '../../engine/components/normal-material';
import { RenderableTag } from '../../engine/components/renderable-tag';
import { Transform } from '../../engine/components/transform';
import { useEngine } from '../../engine/engine-provider';
import { Theme } from '../../themes';
import { world } from '../../world';
import { Menu } from './menu';
import { GeometryType } from './types';

let counter = 0;
const getSequence = () => counter++;

export const MenuContainer = () => {
    console.log('menu-container rerender');
    const { setSelectedEntity } = useEngine();
    const { setTheme } = useTheme<Theme>();

    const handleAddEntity = useCallback(
        async (geometryType: GeometryType) => {
            const [obj] = await FileLoader.load(`/assets/${geometryType}.obj`).then(parseObjFile);
            const entityName = `${geometryType}-${getSequence()}`;
            world.addEntity(entityName, [new Transform(), new Geometry(obj), new NormalMaterial(), new RenderableTag()]);
            setSelectedEntity(entityName);
        },
        [setSelectedEntity],
    );

    return <Menu onAddEntity={handleAddEntity} onThemeChange={setTheme} />;
};
