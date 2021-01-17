import { useTheme } from 'massiv-design-system';
import React from 'react';
import { Box } from '../../components/box';
import { Theme } from '../../themes';

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
        </Box>
    );
};
