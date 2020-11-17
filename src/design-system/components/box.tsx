import React from 'react';
import { styled } from '../styled';
import { borderConfig, BorderProps } from '../system/border';
import { colorConfig, ColorProps } from '../system/color';
import { displayConfig, DisplayProps } from '../system/display';
import { flexConfig, FlexProps } from '../system/flex';
import { FontProps, fontConfig } from '../system/font';
import { GridProps, gridConfig } from '../system/grid';
import { HeightProps, heightConfig } from '../system/height';
import { marginConfig, MarginProps } from '../system/margin';
import { overflowConfig, OverflowProps } from '../system/overflow';
import { paddingConfig, PaddingProps } from '../system/padding';
import { positionConfig, PositionProps } from '../system/position';
import { ShadowProps, shadowConfig } from '../system/shadow';
import { WidthProps, widthConfig } from '../system/width';
import { Theme } from '../theme/default-theme';
import { buildCss } from '../utils/build-css';
import { shouldForwardProp } from '../utils/should-forward-prop';

export type BoxSystemProps<T extends Theme> = ColorProps<T> &
    BorderProps<T> &
    PaddingProps<T> &
    MarginProps<T> &
    FontProps<T> &
    ShadowProps<T> &
    GridProps<T> &
    WidthProps<T> &
    HeightProps<T> &
    FlexProps &
    PositionProps &
    DisplayProps &
    OverflowProps;

export type BoxProps<T extends Theme = Theme> = React.HTMLAttributes<HTMLDivElement> &
    BoxSystemProps<T> & {
        as?: React.ElementType;
        children?: React.ReactNode;
        _hover?: BoxSystemProps<T>;
        _focus?: BoxSystemProps<T>;
        [x: string]: unknown;
    };

export const boxConfig = [
    ...colorConfig,
    ...borderConfig,
    ...paddingConfig,
    ...marginConfig,
    ...flexConfig,
    ...positionConfig,
    ...displayConfig,
    ...overflowConfig,
    ...fontConfig,
    ...shadowConfig,
    ...gridConfig,
    ...widthConfig,
    ...heightConfig,
];

export const Box: React.FC<BoxProps> = styled.div.withConfig({ shouldForwardProp })`
    ${buildCss(boxConfig)}
    &:hover {
        ${buildCss(boxConfig, '_hover')}
    }
    &:focus {
        ${buildCss(boxConfig, '_focus')}
    }
`;

export const getBoxWithCustomTheme = <CustomTheme extends Theme>() => Box as React.FC<BoxProps<CustomTheme>>;
