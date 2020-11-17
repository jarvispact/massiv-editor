import { CssPropertyConfig } from '../utils/build-css';
import { ResponsiveProp } from '../utils/types';

export type DisplayProps = {
    display?: ResponsiveProp;
    clipPath?: ResponsiveProp;
    listStyle?: ResponsiveProp;
    textDecoration?: ResponsiveProp;
    resize?: ResponsiveProp;
};

export const displayConfig: CssPropertyConfig[] = [
    {
        cssProperty: 'display',
        componentProps: ['display'],
        themeScope: null,
    },
    {
        cssProperty: 'clip-path',
        componentProps: ['clipPath'],
        themeScope: null,
    },
    {
        cssProperty: 'list-style',
        componentProps: ['listStyle'],
        themeScope: null,
    },
    {
        cssProperty: 'text-decoration',
        componentProps: ['textDecoration'],
        themeScope: null,
    },
    {
        cssProperty: 'resize',
        componentProps: ['resize'],
        themeScope: null,
    },
];
