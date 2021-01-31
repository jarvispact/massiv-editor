import React from 'react';
import { Box } from './box';
import { Theme } from '../themes';
import { BoxProps } from 'massiv-design-system';

export const Label: React.FC<BoxProps<Theme, HTMLLabelElement>> = React.forwardRef((props: BoxProps<Theme>, ref) => {
    return (
        <Box as="label" color="text" fontSize="s" fontWeight="s" ref={ref} {...props}>
            {props.children}
        </Box>
    );
});

Label.displayName = 'Label';
