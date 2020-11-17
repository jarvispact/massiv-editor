import { CssPropertyConfig } from '../utils/build-css';
import { ResponsiveProp } from '../utils/types';

export type PositionProps = {
    position?: ResponsiveProp;
    pos?: ResponsiveProp;
    top?: ResponsiveProp;
    left?: ResponsiveProp;
    bottom?: ResponsiveProp;
    right?: ResponsiveProp;
};

export const positionConfig: CssPropertyConfig[] = [
    {
        cssProperty: 'position',
        componentProps: ['position', 'pos'],
        themeScope: null,
    },
    {
        cssProperty: 'top',
        componentProps: ['top'],
        themeScope: null,
    },
    {
        cssProperty: 'left',
        componentProps: ['left'],
        themeScope: null,
    },
    {
        cssProperty: 'bottom',
        componentProps: ['bottom'],
        themeScope: null,
    },
    {
        cssProperty: 'right',
        componentProps: ['right'],
        themeScope: null,
    },
];
