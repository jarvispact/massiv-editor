import { BoxProps } from 'massiv-design-system';
import React from 'react';
import { Theme } from '../themes';
import { Box } from './box';

export type IconSvgProps = BoxProps<Theme> & {
    size?: BoxProps<Theme>['width'];
};

export const IconSvg: React.FC<IconSvgProps> = (props: IconSvgProps) => {
    return (
        <Box
            as="svg"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width={props.size || 'm'}
            height={props.size || 'm'}
            aria-hidden="true"
            {...props}
        >
            {props.children}
        </Box>
    );
};
