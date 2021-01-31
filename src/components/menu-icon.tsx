import React from 'react';
import { IconSvg, IconSvgProps } from './icon-svg';

export const MenuIcon: React.FC<IconSvgProps> = (props: IconSvgProps) => {
    return (
        <IconSvg {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </IconSvg>
    );
};
