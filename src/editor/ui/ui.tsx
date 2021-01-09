import { Entity } from 'massiv-3d';
import { useTheme } from 'massiv-design-system';
import React from 'react';
import { Box } from '../../components/box';
import { Geometry } from '../../engine/components/geometry';
import { Transform } from '../../engine/components/transform';
import { world } from '../../engine/world';
import { Theme } from '../../themes';

const r = () => (Math.random() > 0.5 ? Math.random() : -Math.random());

const addTriangle = () => {
    world.addEntity(
        new Entity(`DemoTriangle-${Math.random()}`, [
            new Transform({ translation: [0, r(), 0] }),
            new Geometry({
                positions: [-1, 0, 1, 1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, -1],
            }),
        ]),
    );
};

export const UI = () => {
    const { setTheme } = useTheme<Theme>();
    return (
        <Box gridArea="ui" width="100%" height="100%" bg="appBackground">
            <Box as="button" onClick={() => setTheme('dark')}>
                dark theme
            </Box>
            <Box as="button" onClick={() => setTheme('light')}>
                light theme
            </Box>
            <Box as="button" onClick={addTriangle}>
                add triangle
            </Box>
        </Box>
    );
};
