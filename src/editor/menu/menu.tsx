import React from 'react';
import { Box } from '../../components/box';
import { ThemeKey } from '../../themes';
import { GeometryType } from './types';
import { FileMenuButton } from './file-menu-button';
import { WorldMenuButton } from './world-menu-button';
import { SettingsMenuButton } from './settings-menu-button';

type Props = {
    onAddEntity: (type: GeometryType) => Promise<void>;
    onThemeChange: (theme: ThemeKey) => void;
};

export const Menu = React.memo(({ onAddEntity, onThemeChange }: Props) => {
    console.log('menu rerender');
    return (
        <Box gridArea="menu" bg="menuBackground" display="flex" alignItems="center">
            <Box ml="xl">
                <FileMenuButton />
            </Box>
            <Box ml="xl">
                <WorldMenuButton onAddEntity={onAddEntity} />
            </Box>
            <Box ml="xl">
                <SettingsMenuButton onThemeChange={onThemeChange} />
            </Box>
        </Box>
    );
});

Menu.displayName = 'Menu';
