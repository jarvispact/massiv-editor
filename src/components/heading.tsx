import React from 'react';
import { Box } from './box';
import { Theme } from '../themes';
import { BoxProps } from 'massiv-design-system';

export const Heading: React.FC<BoxProps<Theme, HTMLHeadingElement>> = React.forwardRef((props: BoxProps<Theme>, ref) => {
    return (
        <Box as="h3" color="textColor" ref={ref} {...props}>
            {props.children}
        </Box>
    );
});

Heading.displayName = 'Heading';
