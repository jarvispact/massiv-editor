import { Theme } from '../theme/default-theme';
import { CssPropertyConfig } from '../utils/build-css';
import { ResponsiveThemeProp } from '../utils/types';

export type WidthProps<T extends Theme> = {
    width?: ResponsiveThemeProp<T, 'width'>;
    w?: ResponsiveThemeProp<T, 'width'>;
    minWidth?: ResponsiveThemeProp<T, 'width'>;
    minW?: ResponsiveThemeProp<T, 'width'>;
    maxWidth?: ResponsiveThemeProp<T, 'width'>;
    maxW?: ResponsiveThemeProp<T, 'width'>;
};

export const widthConfig: CssPropertyConfig[] = [
    {
        cssProperty: 'width',
        componentProps: ['width', 'w'],
        themeScope: 'width',
    },
    {
        cssProperty: 'min-width',
        componentProps: ['minWidth', 'minW'],
        themeScope: 'width',
    },
    {
        cssProperty: 'max-width',
        componentProps: ['maxWidth', 'maxW'],
        themeScope: 'width',
    },
];
