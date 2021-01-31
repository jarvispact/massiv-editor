import React from 'react';
import { Box } from './box';
import { Theme } from '../themes';
import { BoxProps } from 'massiv-design-system';

type Props = BoxProps<Theme, HTMLInputElement> & {
    name: string;
};

export const Input: React.FC<Props> = React.forwardRef((props: Props, ref) => {
    return (
        <Box
            ref={ref}
            as="input"
            width="100%"
            bg="inputBackground"
            color="text"
            bs="solid"
            bc="inputBackground"
            bw="1px"
            br="s"
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
