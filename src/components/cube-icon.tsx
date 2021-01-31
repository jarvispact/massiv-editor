import React from 'react';
import { IconSvg, IconSvgProps } from './icon-svg';

export const CubeIcon: React.FC<IconSvgProps> = (props: IconSvgProps) => {
    return (
        <IconSvg {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </IconSvg>
    );
};
