import React from 'react';
import { Box } from './box';
import { Theme } from '../themes';
import { BoxProps } from 'massiv-design-system';
import { Text } from './text';

type Props = BoxProps<Theme> & {
    icon?: React.ReactNode;
};

export const MenuButton: React.FC<Props> = React.forwardRef((props: Props, ref) => {
    return (
        <Box
            ref={ref}
            as="button"
            color="primary500"
            bg="transparent"
            bs="none"
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="2xl"
            {...props}
        >
            {props.icon || null}
            <Text color="currentColor" fontWeight="l" lineHeight="s" position="relative" top="-1px">
                {props.children}
            </Text>
        </Box>
    );
});

MenuButton.displayName = 'MenuButton';
