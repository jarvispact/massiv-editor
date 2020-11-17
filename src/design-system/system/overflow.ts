import { CssPropertyConfig } from '../utils/build-css';
import { ResponsiveProp } from '../utils/types';

export type OverflowProps = {
    overflow?: ResponsiveProp;
    overflowX?: ResponsiveProp;
    overflowY?: ResponsiveProp;
};

export const overflowConfig: CssPropertyConfig[] = [
    {
        cssProperty: 'overflow',
        componentProps: ['overflow'],
        themeScope: null,
    },
    {
        cssProperty: 'overflow-x',
        componentProps: ['overflowX'],
        themeScope: null,
    },
    {
        cssProperty: 'overflow-y',
        componentProps: ['overflowY'],
        themeScope: null,
    },
];
