import React from 'react';
import { BoxProps, getBoxWithCustomTheme } from '../../design-system';
import { Theme } from '../../themes';

const InputBox = getBoxWithCustomTheme<Theme, HTMLInputElement>();

export const PanelInput: React.FC<BoxProps<Theme, HTMLInputElement>> = (props: BoxProps<Theme, HTMLInputElement>) => (
    <InputBox as="input" type="text" bg="panelInputBG" bs="solid" bc="panelInputBorder" br="s" bw="1px" {...props} />
);
