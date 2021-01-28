import React from 'react';
import { Box } from '../../components/box';
import { Cog } from '../../components/cog';
import { ThemeKey } from '../../themes';
import { GeometryType } from './types';

type Props = {
    onAddEntity: (type: GeometryType) => Promise<void>;
    onThemeChange: (theme: ThemeKey) => void;
};

export const Menu = React.memo(({ onAddEntity, onThemeChange }: Props) => {
    console.log('menu rerender');
    return (
        <Box gridArea="menu" bg="appBackground900" display="flex" alignItems="center" bbs="solid" bbc="appBackground900" bbw="1px">
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
            <Box as="button" onClick={() => onThemeChange('light')}>
                light theme
            </Box>
            <Box as="button" onClick={() => onThemeChange('dark')}>
                dark theme
            </Box>
            <Cog />
        </Box>
    );
});

Menu.displayName = 'Menu';
