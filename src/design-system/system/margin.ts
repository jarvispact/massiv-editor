import { Theme } from '../theme/default-theme';
import { CssPropertyConfig } from '../utils/build-css';
import { ResponsiveThemeProp } from '../utils/types';

export type MarginProps<T extends Theme> = {
    margin?: ResponsiveThemeProp<T, 'spacing'>;
    m?: ResponsiveThemeProp<T, 'spacing'>;
    marginTop?: ResponsiveThemeProp<T, 'spacing'>;
    mt?: ResponsiveThemeProp<T, 'spacing'>;
    marginLeft?: ResponsiveThemeProp<T, 'spacing'>;
    ml?: ResponsiveThemeProp<T, 'spacing'>;
    marginBottom?: ResponsiveThemeProp<T, 'spacing'>;
    mb?: ResponsiveThemeProp<T, 'spacing'>;
    marginRight?: ResponsiveThemeProp<T, 'spacing'>;
    mr?: ResponsiveThemeProp<T, 'spacing'>;
};

export const marginConfig: CssPropertyConfig[] = [
    {
        cssProperty: 'margin',
        componentProps: ['margin', 'm'],
        themeScope: 'spacing',
    },
    {
        cssProperty: 'margin-top',
        componentProps: ['marginTop', 'mt'],
        themeScope: 'spacing',
    },
    {
        cssProperty: 'margin-left',
        componentProps: ['marginLeft', 'ml'],
        themeScope: 'spacing',
    },
    {
        cssProperty: 'margin-bottom',
        componentProps: ['marginBottom', 'mb'],
        themeScope: 'spacing',
    },
    {
        cssProperty: 'margin-right',
        componentProps: ['marginRight', 'mr'],
        themeScope: 'spacing',
    },
];
