import React from 'react';
import { BoxProps, styled } from 'massiv-design-system';
import { Box } from '../../components/box';
import { Theme } from '../../themes';

const HoverBox: React.FC<BoxProps<Theme>> = styled(Box)<{ theme: Theme }>`
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.color.menuDropdownHoverBackground};
    }
`;

export const MenuListItem: React.FC<BoxProps<Theme>> = (props: BoxProps<Theme>) => <HoverBox as="li" display="flex" alignItems="center" p="m" {...props} />;
