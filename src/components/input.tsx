import React from 'react';
import { Box } from './box';
import { Theme } from '../themes';
import { BoxProps } from 'massiv-design-system';

export const Input: React.FC<BoxProps<Theme, HTMLInputElement>> = React.forwardRef((props: BoxProps<Theme, HTMLInputElement>, ref) => {
    return (
        <Box
            ref={ref}
            as="input"
            width="100%"
            bg="appBackground900"
            bs="solid"
            bc="appBackground900"
            bw="1px"
            {...props}
            id={props.name}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
        />
    );
});

Input.displayName = 'Input';
