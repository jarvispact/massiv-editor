import React from 'react';
import { styled } from '../styled';
import { Theme } from '../theme/default-theme';
import { buildCss } from '../utils/build-css';
import { borderConfig, BorderProps } from '../system/border';
import { colorConfig, ColorProps } from '../system/color';
import { displayConfig, DisplayProps } from '../system/display';
import { flexConfig, FlexProps } from '../system/flex';
import { GridProps, gridConfig } from '../system/grid';
import { HeightProps, heightConfig } from '../system/height';
import { WidthProps, widthConfig } from '../system/width';
import { marginConfig, MarginProps } from '../system/margin';
import { paddingConfig, PaddingProps } from '../system/padding';
import { positionConfig, PositionProps } from '../system/position';
import { ShadowProps, shadowConfig } from '../system/shadow';
import { createShouldForwardProp } from '../utils/should-forward-prop';

type SystemProps<T extends Theme> = ColorProps<T> &
    BorderProps<T> &
    PaddingProps<T> &
    MarginProps<T> &
    ShadowProps<T> &
    GridProps<T> &
    WidthProps<T> &
    HeightProps<T> &
    FlexProps &
    PositionProps &
    DisplayProps;

export type ImageProps<T extends Theme = Theme> = React.HTMLAttributes<HTMLImageElement> &
    SystemProps<T> & {
        as?: React.ElementType;
        children?: React.ReactNode;
        src?: string;
        alt?: string;
        width?: string;
        height?: string;
        [x: string]: unknown;
    };

const imageConfig = [
    ...colorConfig,
    ...borderConfig,
    ...paddingConfig,
    ...marginConfig,
    ...flexConfig,
    ...positionConfig,
    ...displayConfig,
    ...shadowConfig,
    ...gridConfig,
    ...widthConfig,
    ...heightConfig,
];

export const Image: React.FC<ImageProps> = styled.img.withConfig({
    shouldForwardProp: createShouldForwardProp(['color', 'spacing', 'display', 'fontFamily', 'fontSize']),
})`
    ${buildCss(imageConfig)}
`;

export const getImageWithCustomTheme = <CustomTheme extends Theme>() => Image as React.FC<ImageProps<CustomTheme>>;
