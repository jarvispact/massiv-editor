import React from 'react';
import { BoxProps, getBoxWithCustomTheme } from '../../design-system';
import { Theme } from '../../themes';

const PanelHeadingBox = getBoxWithCustomTheme<Theme, HTMLHeadingElement>();

export const PanelHeading: React.FC<BoxProps<Theme, HTMLHeadingElement>> = (props: BoxProps<Theme, HTMLHeadingElement>) => (
    <PanelHeadingBox as="h3" color="panelText" pb="m" {...props} />
);
