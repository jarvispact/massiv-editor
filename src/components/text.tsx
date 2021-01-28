import React from 'react';
import { Box } from './box';
import { Theme } from '../themes';
import { BoxProps } from 'massiv-design-system';

export const Text: React.FC<BoxProps<Theme, HTMLParagraphElement>> = React.forwardRef(({ children, ...props }: BoxProps<Theme>) => {
    return (
        <Box as="p" color="textColor" {...props}>
            {children}
        </Box>
    );
});

Text.displayName = 'Text';
