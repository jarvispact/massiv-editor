import React from 'react';
import { BoxProps, getBoxWithCustomTheme } from '../../design-system';
import { Theme } from '../../themes';

const PanelLabelBox = getBoxWithCustomTheme<Theme, HTMLLabelElement>();

type Props = BoxProps<Theme, HTMLLabelElement> & {
    inline?: boolean;
};

export const PanelLabel: React.FC<Props> = (props: Props) => (
    <PanelLabelBox as="label" color="panelText" display={props.inline ? undefined : 'block'} {...props} />
);
