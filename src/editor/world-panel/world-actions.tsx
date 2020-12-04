import { BoundingBox, createMap, Entity, FileLoader, Geometry, hexToRgb, ParsedObjPrimitive, parseObjFile, Transform } from 'massiv-3d';
import React, { useEffect } from 'react';
import { Box } from '../components/box';
import { useTheme } from '../../design-system';
import { useEngine } from '../../engine/engine';
import { Theme } from '../../themes';
import { world } from '../../world';

let id = 0;
const getNextId = () => {
    id += 1;
    return id;
};

const mapRgb = createMap(0, 255, 0, 1);

export const WorldActions = () => {
    const { setTheme, theme } = useTheme<Theme>();
    const { gl } = useEngine();

    useEffect(() => {
        const color = hexToRgb(theme.color.appBackground);
        if (color && gl) {
            console.log('set clear color', color);
            gl.clearColor(mapRgb(color[0]), mapRgb(color[1]), mapRgb(color[2]), 1);
        }
    }, [theme]);

    return (
        <Box display="flex" justifyContent="space-between">
            <Box
                as="button"
                onClick={async () => {
                    const objects = await FileLoader.load('../assets/suzanne.obj').then(parseObjFile);
                    const suzanne = objects.find((o) => o.name === 'Suzanne') as ParsedObjPrimitive;
                    const transform = new Transform();
                    const geometry = new Geometry(suzanne);
                    const boundingBox = BoundingBox.fromGeometry(geometry, transform);
                    world.addEntity(new Entity(`New-Entity-${getNextId()}`, [transform, geometry, boundingBox]));
                }}
            >
                Add Entity
            </Box>
            <Box as="button" onClick={() => setTheme('dark')}>
                dark theme
            </Box>
            <Box as="button" onClick={() => setTheme('light')}>
                light theme
            </Box>
        </Box>
    );
};
