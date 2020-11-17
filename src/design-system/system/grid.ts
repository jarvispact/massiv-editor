import { Theme } from '../theme/default-theme';
import { CssPropertyConfig } from '../utils/build-css';
import { ResponsiveThemeProp, ResponsiveProp } from '../utils/types';

export type GridProps<T extends Theme> = {
    gridTemplateColumns?: ResponsiveProp;
    gridTemplateRows?: ResponsiveProp;
    gridTemplateAreas?: ResponsiveProp;
    columnGap?: ResponsiveThemeProp<T, 'spacing'>;
    rowGap?: ResponsiveThemeProp<T, 'spacing'>;
    gap?: ResponsiveThemeProp<T, 'spacing'>;
    justifyItems?: ResponsiveProp;
    gridColumnStart?: ResponsiveProp;
    gridColumnEnd?: ResponsiveProp;
    gridRowStart?: ResponsiveProp;
    gridRowEnd?: ResponsiveProp;
    gridArea?: ResponsiveProp;
    justifySelf?: ResponsiveProp;
    placeSelf?: ResponsiveProp;
};

export const gridConfig: CssPropertyConfig[] = [
    // grid parent config
    {
        cssProperty: 'grid-template-columns',
        componentProps: ['gridTemplateColumns'],
        themeScope: null,
    },
    {
        cssProperty: 'grid-template-rows',
        componentProps: ['gridTemplateRows'],
        themeScope: null,
    },
    {
        cssProperty: 'grid-template-areas',
        componentProps: ['gridTemplateAreas'],
        themeScope: null,
    },
    {
        cssProperty: 'column-gap',
        componentProps: ['columnGap'],
        themeScope: 'spacing',
    },
    {
        cssProperty: 'row-gap',
        componentProps: ['rowGap'],
        themeScope: 'spacing',
    },
    {
        cssProperty: 'gap',
        componentProps: ['gap'],
        themeScope: 'spacing',
    },
    {
        cssProperty: 'justify-items',
        componentProps: ['justifyItems'],
        themeScope: null,
    },
    // already defined in flex config
    // {
    //     cssProperty: 'align-items',
    //     componentProps: ['alignItems'],
    //     themeScope: null,
    // },
    // {
    //     cssProperty: 'justify-content',
    //     componentProps: ['justifyContent'],
    //     themeScope: null,
    // },
    // {
    //     cssProperty: 'align-content',
    //     componentProps: ['alignContent'],
    //     themeScope: null,
    // },

    // grid child config
    {
        cssProperty: 'grid-column-start',
        componentProps: ['gridColumnStart'],
        themeScope: null,
    },
    {
        cssProperty: 'grid-column-end',
        componentProps: ['gridColumnEnd'],
        themeScope: null,
    },
    {
        cssProperty: 'grid-row-start',
        componentProps: ['gridRowStart'],
        themeScope: null,
    },
    {
        cssProperty: 'grid-row-end',
        componentProps: ['gridRowEnd'],
        themeScope: null,
    },
    {
        cssProperty: 'grid-area',
        componentProps: ['gridArea'],
        themeScope: null,
    },
    {
        cssProperty: 'justify-self',
        componentProps: ['justifySelf'],
        themeScope: null,
    },
    // already defined in flex config
    // {
    //     cssProperty: 'align-self',
    //     componentProps: ['alignSelf'],
    //     themeScope: null,
    // },
    {
        cssProperty: 'place-self',
        componentProps: ['placeSelf'],
        themeScope: null,
    },
];
