import React from 'react';
import { Box } from './box';
import { Theme } from '../themes';
import { BoxProps } from 'massiv-design-system';

export const Text: React.FC<BoxProps<Theme, HTMLParagraphElement>> = React.forwardRef((props: BoxProps<Theme>, ref) => {
    return (
        <Box as="p" ref={ref} color="text" {...props}>
            {props.children}
        </Box>
    );
});

Text.displayName = 'Text';
