import { createEntity, FileLoader, ParsedObjPrimitive, parseObjFile } from 'massiv-3d';
import React, { useEffect } from 'react';
import { Box } from '../components/box';
import { useTheme } from '../../design-system';
import { createGeometry } from '../../engine/components/geometry';
import { createTransform } from '../../engine/components/transform';
import { useEngine } from '../../engine/engine';
import { Theme } from '../../themes';
import { world } from '../../world';

let id = 0;
const getNextId = () => {
    id += 1;
    return id;
};

const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
};

const rgbToHex = (r: number, g: number, b: number) => '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);

const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
};

const createMap = (in_min: number, in_max: number, out_min: number, out_max: number) => (value: number) =>
    ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;

const mapRgb = createMap(0, 255, 0, 1);

export const WorldActions = () => {
    const { setTheme, theme } = useTheme<Theme>();
    const { gl } = useEngine();

    useEffect(() => {
        const color = hexToRgb(theme.color.appBackground);
        if (color && gl) {
            console.log('set clear color', color);
            gl.clearColor(mapRgb(color.r), mapRgb(color.g), mapRgb(color.b), 1);
        }
    }, [theme]);
    return (
        <Box display="flex" justifyContent="space-between">
            <Box
                as="button"
                onClick={async () => {
                    const objects = await FileLoader.load('../assets/suzanne.obj').then(parseObjFile);
                    const suzanne = objects.find((o) => o.name === 'Suzanne') as ParsedObjPrimitive;
                    world.addEntity(
                        createEntity(`New-Entity-${getNextId()}`, [createTransform(), createGeometry(suzanne)]),
                    );
                }}
            >
                Add Entity
            </Box>
            <Box
                as="button"
                onClick={() => {
                    setTheme('dark');
                }}
            >
                dark theme
            </Box>
            <Box
                as="button"
                onClick={() => {
                    setTheme('light');
                }}
            >
                light theme
            </Box>
        </Box>
    );
};
