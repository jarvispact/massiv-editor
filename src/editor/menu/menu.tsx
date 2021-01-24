import React from 'react';
import { Box } from '../../components/box';
import { GeometryType } from './types';

type Props = {
    onAddEntity: (type: GeometryType) => Promise<void>;
};

export const Menu = React.memo(({ onAddEntity }: Props) => {
    console.log('menu rerender');
    return (
        <Box gridArea="menu" width="100%" height="100%" bg="white" display="flex" alignItems="center">
            <Box as="button" onClick={() => onAddEntity('plane')}>
                Add Plane
            </Box>
            <Box as="button" onClick={() => onAddEntity('cube')}>
                Add Cube
            </Box>
            <Box as="button" onClick={() => onAddEntity('sphere')}>
                Add Sphere
            </Box>
            <Box as="button" onClick={() => onAddEntity('cylinder')}>
                Add Cylinder
            </Box>
            <Box as="button" onClick={() => onAddEntity('torus')}>
                Add Torus
            </Box>
        </Box>
    );
});

Menu.displayName = 'Menu';
